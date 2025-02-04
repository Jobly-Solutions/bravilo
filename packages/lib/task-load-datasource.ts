import {
  DatasourceStatus,
  DatasourceType,
  Prisma,
  SubscriptionPlan,
  Usage,
} from '@chaindesk/prisma';
import { prisma } from '@chaindesk/prisma/client';

import { AppDocument } from './types/document';
import { TaskLoadDatasourceRequestSchema } from './types/dtos';
import { DatasourceSchema } from './types/models';
import { ApiError, ApiErrorType } from './api-error';
import { s3 } from './aws';
import countTokens from './count-tokens';
import { DatastoreManager } from './datastores';
import guardDataProcessingUsage from './guard-data-processing-usage';
import { DatasourceLoader } from './loaders';
import logger from './logger';
import refreshStoredTokensUsage from './refresh-stored-tokens-usage';
import triggerTaskLoadDatasource from './trigger-task-load-datasource';
import mime from 'mime-types';

export type DatasourceExtended<T extends {} = DatasourceSchema> =
  Prisma.AppDatasourceGetPayload<typeof updateDatasourceArgs> & T;

const updateDatasourceArgs = Prisma.validator<Prisma.AppDatasourceArgs>()({
  include: {
    datastore: true,
    serviceProvider: true,
    organization: {
      include: {
        usage: true,
        subscriptions: {
          where: {
            status: {
              in: ['active', 'trialing'],
            },
          },
        },
      },
    },
  },
});

const taskLoadDatasource = async (data: TaskLoadDatasourceRequestSchema) => {
  logger.info(`${data.datasourceId}: fetching datasource`);

  const datasource = await prisma.appDatasource.update({
    where: {
      id: data.datasourceId,
    },
    data: {
      status: DatasourceStatus.running,
    },
    ...updateDatasourceArgs,
  });

  if (!datasource) {
    throw new Error('Not found');
  }

  const currentPlan =
    datasource?.organization?.subscriptions?.[0]?.plan ||
    SubscriptionPlan.level_0;

  try {
    guardDataProcessingUsage({
      usage: datasource?.organization?.usage as Usage,
      plan: currentPlan,
    });
  } catch {
    logger.info(`${data.datasourceId}: usage limit reached`);

    await prisma.appDatasource.update({
      where: {
        id: datasource.id,
      },
      data: {
        status: DatasourceStatus.usage_limit_reached,
      },
    });
    return;
  }

  const loader = new DatasourceLoader(datasource);

  if (loader.isGroup) {
    await loader.load();

    await prisma.appDatasource.update({
      where: {
        id: datasource.id,
      },
      data: {
        lastSynch: new Date(),
        nbSynch: datasource?.nbSynch! + 1,
      },
    });

    logger.info(
      `${datasource?.id}: datasource group of type ${datasource?.type} run successfully`
    );

    return;
  }

  let documents: AppDocument[] = [];
  try {
    documents = (
      data.isUpdateText ? await loader.loadText() : await loader.load()
    )!;
  } catch (err) {
    if (err instanceof ApiError) {
      if (err.name === ApiErrorType.WEBPAGE_IS_SITEMAP) {
        // WebPage is a sitemap re-run as a sitemap
        await prisma.appDatasource.update({
          where: {
            id: datasource.id,
          },
          data: {
            type: DatasourceType.web_site,
            status: DatasourceStatus.unsynched,
            config: {
              ...(datasource.config as any),
              sitemap: (datasource?.config as any)?.source_url,
            },
          },
        });

        await triggerTaskLoadDatasource([
          {
            organizationId: datasource.organizationId!,
            datasourceId: datasource.id,
            priority: 2,
          },
        ]);
        return;
      }
    }
    throw err;
  }

  const hash = await DatastoreManager.hash(documents);

  if (hash === datasource.hash) {
    logger.info('No need to process datasource, data has not changed');

    await prisma.appDatasource.update({
      where: {
        id: datasource.id,
      },
      data: {
        status: DatasourceStatus.synched,
        lastSynch: new Date(),
        nbSynch: datasource?.nbSynch! + 1,
      },
    });

    return;
  }

  const chunks = await new DatastoreManager(
    datasource.datastore!
  ).uploadDatasourceDocs(datasource.id, documents);

  const text = chunks?.map((each) => each.pageContent)?.join('');
  const textSize = text?.length || 0;
  const nbTokens = countTokens({ text });

  logger.info(`${data.datasourceId}: loading finished`);

  const updated = await prisma.appDatasource.update({
    where: {
      id: datasource.id,
    },
    data: {
      nbTokens: nbTokens,
      nbChunks: chunks.length,
      textSize: textSize,
      status: DatasourceStatus.synched,
      lastSynch: new Date(),
      nbSynch: datasource?.nbSynch! + 1,
      hash,
      // Update usage
      organization: {
        update: {
          usage: {
            update: {
              nbDataProcessingBytes:
                (datasource?.organization?.usage?.nbDataProcessingBytes || 0) +
                new TextEncoder().encode(text).length,
            },
          },
        },
      },
    },
    include: {
      datastore: true,
    },
  });

  // **🔹 FORZAR QUE SE GUARDE CON LA EXTENSIÓN CORRECTA**
  let fileExtension = 'json'; // Valor por defecto

  if (datasource.type === DatasourceType.file) {
    const mimeType = (datasource.config as any)?.mime_type;
    const detectedExtension = mimeType ? mime.extension(mimeType) : null;
    if (detectedExtension) {
      fileExtension = detectedExtension;
    }
  }

  logger.info(`🔍 Archivo original: ${datasource.id}`);
  logger.info(`📂 Mime Type detectado: ${(datasource.config as any)?.mime_type}`);
  logger.info(`📌 Extensión final: .${fileExtension}`);

  const fileName = `datastores/${datasource.datastore?.id}/${datasource.id}/${datasource.id}.${fileExtension}`;

  // **🔹 Subir el archivo a S3 con la extensión correcta**
  const params = {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
    Key: fileName,
    Body: Buffer.from(
      JSON.stringify({
        hash,
        text,
      })
    ),
    CacheControl: 'no-cache',
    ContentType: mime.lookup(fileExtension) || 'application/octet-stream',
  };

  await s3.putObject(params).promise();

  await refreshStoredTokensUsage(datasource.organizationId!);

  logger.info(`✅ ${data.datasourceId}: archivo subido con nombre ${fileName}`);
};

export default taskLoadDatasource;
