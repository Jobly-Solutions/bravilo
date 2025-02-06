import type { DatasourceSchema } from '@chaindesk/lib/types/models';
import type { AppDatasource as Datasource } from '@chaindesk/prisma';
import { ZodSchema } from "zod";
import type { ReactNode } from "react";  // ✅ Importamos ReactNode correctamente

export type DatasourceFormProps<T extends {} = DatasourceSchema> = {
  defaultValues?: T;
  schema?: ZodSchema<any>;
  customSubmitButton?: any;
  submitButtonText?: string;
  submitButtonProps?: any;
  onSubmitSuccess?: (datasource: Partial<Datasource>) => any;

  // 🚀 Propiedades agregadas:
  hideName?: boolean;
  hideText?: boolean;
  children?: ReactNode;
  onBack?: () => void;
};
