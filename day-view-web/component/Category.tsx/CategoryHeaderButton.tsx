import { memo, MouseEventHandler, SyntheticEvent } from 'react';
import styled, { css } from 'styled-components';
import { toRGBA } from '@/shared/util/colorInfo';

interface Props {
  isSelected: boolean;
  name: string;
  id: number;
  color: string;
  toggleHandler(e: SyntheticEvent<HTMLButtonElement>, channelId: number): void;
}

const CategoryHeaderButton = ({
  isSelected,
  id,
  name,
  toggleHandler,
  color,
}: Props) => {
  const mainColor = toRGBA(color, 1);
  return (
    <CategoryButton
      isSelected={isSelected}
      mainColor={mainColor}
      onClick={(e) => toggleHandler(e, id)}
    >
      {name}
    </CategoryButton>
  );
};

export default memo(CategoryHeaderButton);

const CategoryButton = styled.button<{
  isSelected: boolean;
  mainColor: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 4px 20px;
  width: auto;
  border-radius: 20px;
  white-space: nowrap;
  transition: all 0.15s ease-in-out 0;
  ${({ theme, isSelected, mainColor }) =>
    isSelected
      ? css`
          color: ${mainColor};
          border: 1px solid ${mainColor};
          background: #fff;
        `
      : css`
          color: #222;
          border: 1px solid ${theme.colors.G_200};
          background: ${theme.colors.G_200};
        `};
`;
