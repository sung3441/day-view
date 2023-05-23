import { ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';
import { getStyledThemProperty } from '@/shared/styles/util';

type Direction = 'left' | 'right' | 'top' | 'bottom';

interface Props {
  children?: ReactNode;
  direction?: Direction;
  message?: string;
}

const Tooltip = ({ children, direction, message }: Props) => {
  return (
    <Wrapper>
      {children}
      <Message>{message}</Message>
    </Wrapper>
  );
};

export default Tooltip;

const Message = styled.div`
  display: none;
  position: absolute;
  top: 75px;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 14px 28px;
  border-radius: 11px;

  ${getStyledThemProperty('fonts', 'caption2')};
  color: ${getStyledThemProperty('colors', 'White')};
  background-color: ${getStyledThemProperty('colors', 'G_500')};
  opacity: 0;

  white-space: nowrap;
  z-index: 50;

  &::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translate(-50%, 0);

    border: 8px solid;
    border-color: transparent transparent
      ${getStyledThemProperty('colors', 'G_500')} transparent;
  }
`;

const Move = keyframes`
  from {
    transform: translate(-50%, -65%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;

  &:hover > ${Message}, &:active > ${Message} {
    display: block;
    animation: ${Move} 0.3s ease-out 0.3s forwards;
  }
`;
