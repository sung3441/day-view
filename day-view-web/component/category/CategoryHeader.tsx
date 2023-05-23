import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';
import styled from 'styled-components';
import CategoryButton from './CategoryHeaderButton';

interface Props {
  categories?: { name: string; id: number }[];
}

// '카테고리' 탭 누르면 실행
const CategoryHeader = ({ categories }: Props) => {
  return (
    <Wrap>
      {categories?.map((category) => (
        <CategoryButton key={category.id}>{category.name}</CategoryButton>
      ))}
    </Wrap>
  );
};

export default CategoryHeader;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  ${getStyledThemProperty('layout', 'pageHeader')}
`;
