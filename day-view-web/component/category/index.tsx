import { memo } from 'react';
import useGetChannel from '@/shared/context/channel/hooks/useGetChannel';
import CategoryHeader from '@/component/category/CategoryHeader';
import CategoryDetail from '@/component/category/CategoryDetail';
import useGetMyChannel from '@/shared/context/channel/hooks/useGetMyChannel';

const Category = () => {
  const { myChannelRecodes } = useGetMyChannel();

  return (
    <>
      <CategoryHeader categories={myChannelRecodes} />
      <CategoryDetail />
    </>
  );
};

export default memo(Category);
