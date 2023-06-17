import { Client } from '@/shared/axios';
import { Token, UserType } from '@/shared/types/api';

export const getAccessToken = async () => {
  const res = await new Client('/api/v1/auth/refresh').get<Token>();
  console.log('res', res);
  return res;
};

export const getUser = async () => {
  const res = await new Client('/api/members/me').get<UserType>();
  console.log('res', res);
  return res;
};
