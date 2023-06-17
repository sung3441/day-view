import Auth from '@/shared/axios';

export function setCookie(pCookie: string | undefined) {
  console.log('pCookie', pCookie);
  Auth.defaults.headers.Cookie = pCookie || '';
}

export function setAccessToken(accessToken: string) {
  // Todo 에러 코드로 던져야함.
  if (!accessToken) return;
  Auth.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}
