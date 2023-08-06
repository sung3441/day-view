import { memo, useCallback } from 'react';
import { RecordRes } from '@/shared/types/api';
import { useRecoilValue } from 'recoil';
import { selectedCategoryIdAtom } from '@/shared/context/category/state';
import useGetRecord from '@/shared/context/record/hooks/useGetRecord';
import { selectedYYMMAtom } from '@/state/calendar';

type Props = {};

const CategoryDetail = ({}: Props) => {
  const { year, month } = useRecoilValue(selectedYYMMAtom);
  const selectedCategoryId = useRecoilValue(selectedCategoryIdAtom);

  const selectSelectedYYMMRecords = useCallback(
    (data: any) => {
      const redData = data?.data?.data as RecordRes[];
      const strMonth = month.toString();
      const targetYYMM = `${year}-${
        strMonth.length === 1 ? `0${strMonth}` : strMonth
      }`;
      return redData.filter(({ startDate }) => {
        const parts = startDate.split('-');
        return parts.slice(0, 2).join('-') === targetYYMM;
      });
    },
    [year, month]
  );

  const { data, status } = useGetRecord(
    selectedCategoryId,
    selectSelectedYYMMRecords
  );

  console.log(data);
  if (status !== 'success') return null;
  return <div></div>;
};

export default memo(CategoryDetail);
