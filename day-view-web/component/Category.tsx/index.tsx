import { memo } from 'react';
import useGetChannel from '@/shared/context/channel/hooks/useGetChannel';
import CategoryHeader from '@/component/Category.tsx/CategoryHeader';
import CategoryDetail from '@/component/Category.tsx/CategoryDetail';

const Category = () => {
  const { data, status } = useGetChannel({ selectType: 'MANAGE' });

  if (status !== 'success') return null;
  return (
    <>
      <CategoryHeader categories={data!.data} />
      <CategoryDetail />
    </>
  );
};

export default memo(Category);
