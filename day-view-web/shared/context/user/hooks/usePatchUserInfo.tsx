import { useMutation, useQueryClient } from 'react-query';
import { patchUser } from '@/shared/api';
import { QueryKeys } from '@/shared/queryClient';

const usePatchUserInfo = () => {
  const queryClient = useQueryClient();

  return useMutation(patchUser, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([QueryKeys.USER]);
    },
  });
};

export default usePatchUserInfo;
