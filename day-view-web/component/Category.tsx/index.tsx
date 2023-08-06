import { memo } from 'react';
import useGetChannel from '@/shared/context/channel/hooks/useGetChannel';
import CategoryHeader from '@/component/Category.tsx/CategoryHeader';
import Detail from '@/component/Category.tsx/CategoryDetail';
import { selectedCategoryIdAtom } from '@/shared/context/category/state';
import { useRecoilValue } from 'recoil';

const Category = () => {
  const { data, status } = useGetChannel({ selectType: 'MANAGE' });

  if (status !== 'success') return null;
  return (
    <>
      <CategoryHeader categories={data!.data} />
      <Detail />
    </>
  );
};

export default memo(Category);
