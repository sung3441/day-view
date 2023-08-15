import Auth from '@/shared/axios';
import { getAccessToken } from '@/shared/api';

export function setCookie(cookie: string) {
  Auth.defaults.headers.Cookie = cookie || '';
}

export function setAccessToken(accessToken: string) {
  // Todo 에러 코드로 던져야함.
  Auth.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

export function removeAccessToken() {
  Auth.defaults.headers.common['Authorization'] = '';
}

export async function isSetAccessToken(cookie: string) {
  try {
    setCookie(cookie);
    const token = await getAccessToken();
    setAccessToken(token!.data.token);
    return true;
  } catch (e) {
    return false;
  }
}
