import { memo } from 'react';
import useGetChannel from '@/shared/context/channel/hooks/useGetChannel';
import CategoryHeader from '@/component/category/CategoryHeader';
import CategoryDetail from '@/component/category/CategoryDetail';

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
