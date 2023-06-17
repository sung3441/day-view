import axios, { AxiosError, AxiosInstance } from 'axios';
import qs from 'qs';

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
    console.log('test', this.instance.defaults.headers);
    this.url = url;
  }

  async get<T extends {}>(params: object = {}) {
    try {
      const res = await this.instance.get(this.url, {
        params: this.makeParams(params),
      });
      console.log('res', res);
      const { data, status } = res;
      if (data.errors?.length && data.errors) throw data?.errors[0];
      return {
        data: data.data as T,
        status,
      };
    } catch (error) {
      // TODO 에러 타입 정의 및 에러 상태에 따른 라우터 처리
      if (axios.isAxiosError<ErrorResponse, any>(error)) {
        console.log(error);
        // console.log(error);
        console.log(error.response?.status);
      }
    }
  }

  async post<T extends {}>(params: any = {}) {
    try {
      const res = await this.instance.post(this.url, qs.stringify(params));
      const { data, status } = res;

      if (data.errors?.length && data.errors) throw data?.errors[0];

      return {
        data: data as T,
        status,
      };
    } catch (error) {
      console.log(error);
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
