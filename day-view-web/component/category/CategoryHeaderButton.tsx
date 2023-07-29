import { memo, MouseEventHandler, SyntheticEvent } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  isSelected: boolean;
  name: string;
  id: number;
  toggleHandler(e: SyntheticEvent<HTMLButtonElement>, channelId: number): void;
}

const CategoryHeaderButton = ({
  isSelected,
  id,
  name,
  toggleHandler,
}: Props) => {
  return (
    <CategoryButton
      isSelected={isSelected}
      onClick={(e) => toggleHandler(e, id)}
    >
      {name}
    </CategoryButton>
  );
};

export default memo(CategoryHeaderButton);

const CategoryButton = styled.button<{ isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 4px 20px;
  width: auto;
  border-radius: 20px;
  white-space: nowrap;

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
