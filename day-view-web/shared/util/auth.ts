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
    // todo 페이지 쿠키 -> 쿠키 저장(리플레쉬) -> 토큰 저장
    setCookie(cookie);
    const token = await getAccessToken();
    setAccessToken(token!.data.token);
    return true;
  } catch (e) {
    return false;
  }
}
