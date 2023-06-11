import { Client } from '@/shared/axios';
import { UserType } from '@/shared/types/api';

export const getUser = async () => {
  const res = await new Client('/api/members').get<UserType>();
  return res;
};
