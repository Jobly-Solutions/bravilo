import cuid from 'cuid';
import { z } from 'zod';

import { Datastore, Tool, ToolType } from '@chaindesk/prisma';

import { ToolSchema } from './types/dtos';
import { Prettify } from './type-utilites';

const baseFormatSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

const datastoreFormatSchema = baseFormatSchema.extend({
  datastoreId: z.string(),
});

const formFormatSchema = baseFormatSchema.extend({
  formId: z.string(),
});

const formatSchema = z.discriminatedUnion('type', [
  datastoreFormatSchema.extend({ type: z.literal(ToolType.datastore) }),
  baseFormatSchema.extend({ type: z.literal(ToolType.http) }),
  baseFormatSchema.extend({ type: z.literal(ToolType.request_human) }),
  baseFormatSchema.extend({ type: z.literal(ToolType.mark_as_resolved) }),
  baseFormatSchema.extend({ type: z.literal(ToolType.lead_capture) }),
  formFormatSchema.extend({ type: z.literal(ToolType.form) }),
]);

type Format = z.infer<typeof formatSchema>;

export type NormalizedTool = {
  id?: string;
  type: ToolType;
  name?: string;
  description?: string;
};

export const agentToolConfig = {
  [ToolType.datastore]: {
    icon: '🧠',
    title: '🧠 Almacén de Datos',
    description: 'Conecta datos personalizados a tu Scout.',
  },
  [ToolType.http]: {
    icon: '🛜',
    title: '🛜 Herramienta HTTP',
    description: 'El Scout puede realizar una solicitud HTTP a una API externa.',
  },
  [ToolType.form]: {
    icon: '📋',
    title: '📋 Formulario',
    description: 'Conecta un formulario a tu Scout.',
  },
  [ToolType.mark_as_resolved]: {
    hidden: true,
    icon: '✅',
    title: '✅ Marcar como resuelto',
    description: `El usuario puede marcar la conversación como resuelta.`,
  },
  [ToolType.request_human]: {
    hidden: true,
    icon: '🙋‍♂️',
    title: '🙋‍♂️ Solicitar humano',
    description: `El usuario puede solicitar hablar con un operador humano.`,
  },
  [ToolType.lead_capture]: {
    hidden: true,
    icon: '🎯',
    title: '🎯 Captura de Leads (⚠️ Obsoleto: Usa la herramienta de formulario en su lugar)',
    description: `El Scout puede recopilar correos electrónicos o números de teléfono de los usuarios.`,
  },
};




export const createTool = (payload: ToolSchema) => ({
  ...payload,
  id: payload?.id || cuid(),
});

const agentToolFormat = (
  tool: Exclude<ToolSchema, { type: 'connector' } | { type: 'agent' }>
) => {
  const config = agentToolConfig[tool.type];
  if (config && 'hidden' in config && config.hidden) {
    return null; // No procesar herramientas ocultas
  }

  let format = {
    name: tool.type,
    description: '',
  } as Format;

  const icon = (agentToolConfig as any)?.[tool.type]?.icon as string;

  if (tool.type === ToolType.datastore) {
    format = {
      id: tool.id!,
      datastoreId: tool.datastoreId!,
      type: tool.type,
      name:
        ((tool as any)?.datastore?.name!
          ? `${icon} ` + (tool as any)?.datastore?.name!
          : undefined) || agentToolConfig[ToolType.datastore].description,
      description:
        ((tool as any)?.datastore?.description as string) ||
        agentToolConfig[ToolType.datastore].description,
    };
  } else if (tool.type === ToolType.http) {
    format = {
      id: tool.id!,
      name:
        (tool?.config?.name ? `${icon} ` + tool?.config?.name : undefined) ||
        agentToolConfig[ToolType.http].title,
      type: tool.type,
      description:
        tool?.config?.description || agentToolConfig[ToolType.http].description,
    };
  } else if (tool.type === ToolType.form) {
    format = {
      id: tool.id!,
      formId: tool?.formId,
      type: tool.type,
      name:
        (tool?.form?.name ? `${icon} ` + tool?.form?.name : undefined) ||
        agentToolConfig[ToolType.form].title,
      description:
        tool?.form?.description || agentToolConfig[ToolType.form].description,
    };
  } else {
    format = {
      id: tool.id!,
      type: tool.type,
      name: (agentToolConfig as any)[tool?.type]?.title || tool.type,
      description: (agentToolConfig as any)[tool?.type]?.description || '',
    };
  }

  return {
    ...tool,
    ...format,
  };
};

export default agentToolFormat;
