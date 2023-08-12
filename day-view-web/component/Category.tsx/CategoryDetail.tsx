import { memo, useCallback } from 'react';
import { RecordRes } from '@/shared/types/api';
import { useRecoilValue } from 'recoil';
import { selectedCategoryIdAtom } from '@/shared/context/category/state';
import useGetRecord from '@/shared/context/record/hooks/useGetRecord';
import { selectedYYMMAtom } from '@/state/calendar';
import { selectedYYMMRecords } from '@/component/Category.tsx/util';

type Props = {};

const CategoryDetail = ({}: Props) => {
  const { year, month } = useRecoilValue(selectedYYMMAtom);
  const selectedCategoryId = useRecoilValue(selectedCategoryIdAtom);

  const select = useCallback(
    (data: any) => selectedYYMMRecords(data, year, month),
    [year, month]
  );

  const { data, status } = useGetRecord(selectedCategoryId, select);

  console.log('Record', data);
  if (status !== 'success') return null;
  return <div></div>;
};

export default memo(CategoryDetail);
