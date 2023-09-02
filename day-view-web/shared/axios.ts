import axios, { AxiosError, AxiosInstance } from 'axios';

type ErrorResponse = {
  config?: {};
  data?: {};
  headers?: {};
  request?: {};
  status: number;
  statusText: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const Auth = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Security-Policy': `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' ${process.env.NEXT_PUBLIC_API_URL}`,
  },
});

export default Auth;

export class Client {
  protected readonly instance: AxiosInstance = Auth;
  private readonly url: string;

  constructor(url: string) {
    this.url = url;
  }

  async get<T>(params: object = {}) {
    try {
      const res = await this.instance.get<T>(this.url, {
        params: this.makeParams(params),
      });
      const { data, status } = res;

      return {
        data,
        status,
      };
    } catch (e) {
      this.handleError(e);
    }
  }

  async post<T extends {}>(params: any = {}) {
    try {
      const res = await this.instance.post<T>(this.url, params);
      const { data, status } = res;

      return {
        data: data,
        status,
      };
    } catch (e) {
      this.handleError(e);
    }
  }

  async patch<T extends {}>(params: any = {}) {
    try {
      const res = await this.instance.patch<T>(this.url, params);
      const { data, status } = res;

      return {
        data: data,
        status,
      };
    } catch (e) {
      this.handleError(e);
    }
  }

  async put<T extends {}>(params: any = {}) {
    try {
      const res = await this.instance.put<T>(this.url, params);
      const { data, status } = res;

      return {
        data: data,
        status,
      };
    } catch (e) {
      this.handleError(e);
    }
  }

  async delete<T extends {}>(params: any = {}) {
    try {
      const res = await this.instance.delete<T>(this.url, params);
      const { data, status } = res;

      return {
        data: data,
        status,
      };
    } catch (e) {
      this.handleError(e);
    }
  }

  private makeParams(data: object = {}) {
    if (!Object.keys(data).length) return {};

    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      const v = typeof value === 'string' ? value : JSON.stringify(value);
      params.append(key, v);
    });

    return params;
  }

  private handleError = (e: unknown) => {
    const error = e as AxiosError<ErrorResponse>;
    if (error) throw error;
    throw new Error('error');
  };
}
