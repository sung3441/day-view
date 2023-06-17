import Auth from '@/shared/axios';

export function setCookie(pCookie: string | undefined) {
  console.log('pCookie', pCookie);
  Auth.defaults.headers.Cookie = pCookie || '';
}
