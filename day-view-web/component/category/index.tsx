import { memo } from 'react';
import useGetChannel from '@/shared/context/calendar/hooks/useGetChannel';
import CategoryHeader from '@/component/category/CategoryHeader';

const Category = () => {
  const { data, status } = useGetChannel({ selectType: 'MANAGE' });
  console.log(data);
  if (status !== 'success') return null;
  return (
    <>
      <CategoryHeader categories={data!.data} />
    </>
  );
};

export default memo(Category);
