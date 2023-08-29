import { useMutation, useQueryClient } from 'react-query';
import { QueryKeys } from '@/shared/queryClient';
import { addSchedule } from '@/shared/api';

const splitYearMonth = (date: string) => {
  const [year, month] = date.slice(0, 7).split('-');
  return { year, month };
};

const useAddSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation(addSchedule, {
    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries([QueryKeys.RECORDS]);
      const { startDate, endDate } = variables;

      await queryClient.invalidateQueries([
        QueryKeys.DATE,
        splitYearMonth(startDate).year,
        splitYearMonth(startDate).month,
      ]);
    },
  });
};

export default useAddSchedule;
