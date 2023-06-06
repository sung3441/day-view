import axios, { AxiosInstance } from 'axios';
import qs from 'qs';

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

  async get<T extends {}>(params: object = {}) {
    try {
      const res = await this.instance.get(this.url, {
        params: this.makeParams(params),
      });
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
