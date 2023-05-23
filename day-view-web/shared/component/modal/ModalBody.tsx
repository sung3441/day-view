import { Children, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children?: ReactNode;
  gap?: number;
}

const ModalBody = ({ children, ...props }: Props) => {
  return (
    <S.Body {...props}>
      {Children.map(children, (child) => (
        <S.Section>{child}</S.Section>
      ))}
    </S.Body>
  );
};

export default ModalBody;

const S = {
  Body: styled.div<{ gap?: number }>`
    display: flex;
    flex-direction: column;
    gap: ${({ gap }) => (gap ? `${gap}px` : '22px')};
  `,
  Section: styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  `,
};
