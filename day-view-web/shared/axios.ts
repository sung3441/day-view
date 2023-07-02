import axios, { AxiosError, AxiosInstance } from 'axios';

type ErrorResponse = {
  config?: {};
  data?: {};
  headers?: {};
  request?: {};
  status: number;
  statusText: string;
};

const BASE_URL = 'http://localhost:8080';

const Auth = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
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
    } catch (error) {
      // TODO 에러 타입 정의 및 에러 상태에 따른 라우터 처리
      if (axios.isAxiosError<ErrorResponse, any>(error)) {
        console.log('error', error);
        throw new Error(error?.response?.status.toString());
      }
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
    } catch (error) {
      // TODO 에러 타입 정의 및 에러 상태에 따른 라우터 처리
      if (axios.isAxiosError<ErrorResponse, any>(error)) {
        console.log('error', error);
        throw new Error(error?.response?.status.toString());
      }
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
    } catch (error) {
      // TODO 에러 타입 정의 및 에러 상태에 따른 라우터 처리
      if (axios.isAxiosError<ErrorResponse, any>(error)) {
        console.log('error', error);
        throw new Error(error?.response?.status.toString());
      }
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
}
