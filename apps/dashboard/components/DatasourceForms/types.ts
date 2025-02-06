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
  mode?: "onChange" | "onBlur" | "onSubmit" | "all"; // <-- Agregado para evitar el error
  
    // 🚀 Propiedades que faltaban:
    hideName?: boolean;  // Para ocultar el campo de nombre
    hideText?: boolean;  // Para ocultar el campo de texto extraído
    children?: ReactNode; // Para permitir contenido dentro del form
    onBack?: () => void;  // Para manejar el botón "Back"
  

};
