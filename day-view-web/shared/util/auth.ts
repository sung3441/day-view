import Auth from '@/shared/axios';
import { getAccessToken } from '@/shared/api';

export function setCookie(pCookie: string | undefined) {
  Auth.defaults.headers.Cookie = pCookie || '';
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
