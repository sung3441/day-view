import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'http://localhost:8080';

const Auth = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default Auth;

class Client {
  protected readonly instance: AxiosInstance = Auth;
  private readonly URL: string;
  constructor(url: string) {
    this.URL = url;
  }

  async POST<T extends {}>(data = {}) {
    const params = new URLSearchParams();
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        const v = typeof value === 'string' ? value : JSON.stringify(value);
        params.append(key, v);
      });
    }

    try {
      const res = await this.instance.post(this.URL, params);
      const data = res.data;
      if (data.errors?.length && data.errors) throw data?.errors[0];
      return res.data.data as T;
    } catch (error) {
      console.log(error);
    }
  }
}

const test = new Client('test');
const res = test.POST<{ t: string }>();
