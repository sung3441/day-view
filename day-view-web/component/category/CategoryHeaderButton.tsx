import { ReactNode, useState } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  children: ReactNode;
}

const CategoryHeaderButton = ({ children }: Props) => {
  const [isSelected, setIsSelected] = useState(false);

  const toggleHandler = () => {
    setIsSelected(!isSelected);
  };

  return (
    <Btn isSelected={isSelected} onClick={toggleHandler}>
      {children}
    </Btn>
  );
};

export default CategoryHeaderButton;

const Btn = styled.button<{ isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 4px 20px;
  width: 88px;
  height: 30px;
  border-radius: 20px;

  ${({ theme, isSelected }) =>
    isSelected
      ? css`
          color: ${theme.colors.main};
          border: 1px solid ${theme.colors.main};
          background: #fff;
        `
      : css`
          color: #222;
          border: none;
          background: ${theme.colors.G_200};
        `}
`;
