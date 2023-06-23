import { useMutation, useQueryClient } from 'react-query';
import { QueryKeys } from '@/shared/queryClient';
import { addSchedule } from '@/shared/api';

const useAddSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation(addSchedule, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([QueryKeys.RECORD]);
    },
  });
};

export default useAddSchedule;
