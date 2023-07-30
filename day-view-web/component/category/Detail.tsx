import { memo } from 'react';
import { ChannelRes } from '@/shared/types/api';
import { useRecoilValue } from 'recoil';
import { selectedCategoryIdAtom } from '@/shared/context/category/state';
import useGetRecord from '@/shared/context/record/hooks/useGetRecord';

type Props = {};

const Detail = ({}: Props) => {
  const selectedCategoryId = useRecoilValue(selectedCategoryIdAtom);
  const { data, status } = useGetRecord(selectedCategoryId);

  console.log('data', data);

  return <div>Detatile</div>;
};

export default memo(Detail);
