import { useMutation, useQueryClient } from 'react-query';
import { QueryKeys } from '@/shared/queryClient';
import { deleteRecord } from '@/shared/api';

const useDeleteRecord = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteRecord, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([QueryKeys.RECORDS]);
      await queryClient.invalidateQueries([QueryKeys.DATE]);
    },
  });
};

export default useDeleteRecord;
