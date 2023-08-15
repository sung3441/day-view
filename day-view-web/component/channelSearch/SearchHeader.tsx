import { memo } from 'react';
import styled from 'styled-components';
import { getStyledThemProperty } from '@/shared/styles/util';

const headerItems = ['제목', '개설자', '구독자 수', '개설일', '구독'];

const SearchHeader = () => {
  return (
    <Header>
      {headerItems.map((item) => (
        <Label key={item}>{item}</Label>
      ))}
    </Header>
  );
};

export default memo(SearchHeader);

const Header = styled.div`
  width: 100%;
  height: 100px;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 20%;
  ${getStyledThemProperty('fonts', 'body2')};
`;
