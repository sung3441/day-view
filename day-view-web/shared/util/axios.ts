import * as cookie from 'cookie';
import Auth from '@/shared/axios';

export function setCookie(pCookie: string | undefined) {
  const cookies = cookie.parse(pCookie || '');
  const refresh_token = cookies?.refresh_token as string;
  console.log('refresh_token', refresh_token);
  Auth.defaults.headers.common['Authorization'] = `Bearer ${refresh_token}`;
}
