import styled from 'styled-components';
import CategoryButton from './CategoryButton';

interface Props {
  categories: { name: string; id: number }[];
}

// '카테고리' 탭 누르면 실행
const Category = ({ categories }: Props) => {
  return (
    <Wrap>
      {categories?.map((category) => (
        <CategoryButton key={category.id}>{category.name}</CategoryButton>
      ))}
    </Wrap>
  );
};

export default Category;

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
`;
