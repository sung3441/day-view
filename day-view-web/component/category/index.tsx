import React from 'react';
import CategoryHeader from './CategoryHeader';

const categories = [
  { id: 1, name: '카테고리1' },
  { id: 2, name: '카테고리2' },
];

const Category = () => {
  return (
    <div>
      <CategoryHeader categories={categories}></CategoryHeader>
    </div>
  );
};

export default Category;
