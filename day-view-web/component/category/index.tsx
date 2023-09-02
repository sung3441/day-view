import { memo } from 'react';
import CategoryHeader from '@/component/category/CategoryHeader';
import CategoryDetail from '@/component/category/CategoryDetail';

const Category = () => {
  return (
    <>
      <CategoryHeader />
      <CategoryDetail />
    </>
  );
};

export default memo(Category);
