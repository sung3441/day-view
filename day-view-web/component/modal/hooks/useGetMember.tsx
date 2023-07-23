import { useQuery } from 'react-query';
import { QueryKeys } from '@/shared/queryClient';
import { getUser } from '@/shared/api';

const useGetMember = () => {
  return useQuery([QueryKeys.USER], getUser, { select: (data) => data?.data });
};

export default useGetMember;
