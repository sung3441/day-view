import { useMutation, useQueryClient } from 'react-query';
import { QueryKeys } from '@/shared/queryClient';
import { patchRecord } from '@/shared/api';

const usePatchRecord = () => {
  const queryClient = useQueryClient();

  return useMutation(patchRecord, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([QueryKeys.RECORDS]);
    },
  });
};

export default usePatchRecord;
