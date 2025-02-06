import type { DatasourceSchema } from '@chaindesk/lib/types/models';
import type { AppDatasource as Datasource } from '@chaindesk/prisma';
import { ZodSchema } from "zod";  // Importamos Zod

export type DatasourceFormProps<T extends {} = DatasourceSchema> = {
  defaultValues?: T;
  schema?: ZodSchema<any>; // <-- Agregado para evitar el error
  customSubmitButton?: any;
  submitButtonText?: string;
  submitButtonProps?: any;
  onSubmitSuccess?: (datasource: Partial<Datasource>) => any;
};
