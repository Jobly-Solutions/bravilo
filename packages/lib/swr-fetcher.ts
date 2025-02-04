import axios, { AxiosRequestConfig } from 'axios';

export enum HTTP_METHOD {
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export const generateActionFetcher =
  (method: HTTP_METHOD) =>
  async <T>(uri: string, { arg }: { arg: T }) => {
    try {
      const response = await axios(uri, {
        method,
        data: arg,
        withCredentials: true, // 🔹 Permitir credenciales en la solicitud
        headers: {
          'Content-Type': 'application/json',
          // 🔹 Si necesitas autenticarte con AWS, puedes agregar aquí los headers.
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
        },
      });
      return response.data;
    } catch (error: any) {
      console.error(`❌ Error en ${method} ${uri}:`, error?.response?.status, error?.response?.data);
      throw error;
    }
  };

export const createFetcher =
  (config: AxiosRequestConfig) =>
  async <T>(url: string, { arg }: { arg: T }) => {
    try {
      const response = await axios({
        url,
        ...config,
        data: arg,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error: any) {
      console.error(`❌ Error en ${config.method} ${url}:`, error?.response?.status, error?.response?.data);
      throw error;
    }
  };

export const fetcher = async (...args: Parameters<typeof axios>) => {
  try {
    const response = await axios(...args);
    return response.data;
  } catch (error: any) {
    console.error(`❌ Error en solicitud:`, error?.response?.status, error?.response?.data);
    throw error;
  }
};
