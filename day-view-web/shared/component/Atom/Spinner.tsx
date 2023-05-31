import styled, { keyframes } from 'styled-components';

interface Props {
  width?: number;
  height?: number;
}

const Spinner = ({ width = 50, height = 50 }: Props) => {
  return (
    <S.Spinner viewBox="0 0 50 50" width={width} height={height}>
      <S.Path cx="25" cy="25" r="20" fill="none" />
    </S.Spinner>
  );
};

export default Spinner;

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }`;

const colors = keyframes`
    0% { stroke: hsla(9, 100%, 71%, 1); }
	  50% { stroke: hsla(41, 100%, 65%, 1); }
    100% { stroke: hsla(150, 65%, 44%, 1); }
  `;

const S = {
  Spinner: styled.svg`
    animation: ${rotate} 2s linear infinite;
  `,

  Path: styled.circle`
    stroke-width: 6px;
    stroke-linecap: round;
    animation: ${dash} 1.5s ease-in-out infinite,
      ${colors} 1.5s ease-in-out alternate infinite;
  `,
};
