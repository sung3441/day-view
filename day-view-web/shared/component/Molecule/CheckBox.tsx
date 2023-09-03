import { ComponentPropsWithoutRef, memo } from 'react';
import styled, { css } from 'styled-components';
import { fadeIn } from '@/shared/styles/keyframes';
import { toRGBA } from '@/shared/util/colorInfo';
import { pixelToRemUnit } from '@/shared/styles/util';

type InputType = ComponentPropsWithoutRef<'input'>;

interface props extends InputType {
  id: string;
  label?: string;
  color?: string;
}

const CheckBox = ({
  id,
  label,
  color = 'rgba(173, 20, 87)',
  ...props
}: props) => {
  const mainColor = toRGBA(color, 1);
  const shadowColor = toRGBA(color, 0.26);
  return (
    <>
      <CheckBoxInput
        id={id}
        type="checkbox"
        mainColor={mainColor}
        shadowColor={shadowColor}
        {...props}
      />
      <CheckBoxLabel htmlFor={id}>{label}</CheckBoxLabel>
    </>
  );
};

export default memo(CheckBox);

export const CheckBoxInput = styled.input<{
  mainColor: string;
  shadowColor: string;
}>`
  overflow: hidden;
  position: absolute;
  top: 1px;
  left: 1px;
  width: 1px;
  height: 1px;
  background: transparent;
  appearance: none;

  + label::before {
    content: '';

    position: absolute;
    top: 0;
    left: 0;

    width: ${pixelToRemUnit(28)};
    height: ${pixelToRemUnit(28)};

    border-radius: 7px;
    background-color: #fff;
    border: 2px solid ${({ shadowColor }) => shadowColor};

    transition: background-color 0.15s ease-in-out 0s;
  }

  :checked + label::before {
    background-color: ${({ shadowColor }) => shadowColor};
    border-style: none;
  }

  :checked + label::after {
    animation: ${fadeIn} 0.15s ease-in-out 0s forwards;

    content: '';
    position: absolute;
    transform: rotate(45deg);
    top: ${pixelToRemUnit(7)};
    left: ${pixelToRemUnit(10)};
    width: ${pixelToRemUnit(3)};
    height: ${pixelToRemUnit(10)};
    box-sizing: content-box;

    border-style: solid;
    border-image: initial;
    border-width: 0 ${pixelToRemUnit(4)} ${pixelToRemUnit(4)} 0;
    border-color: ${({ mainColor }) => mainColor};
  }
`;

export const CheckBoxLabel = styled.label`
  position: relative;
  cursor: pointer;
  z-index: 1;
  padding-left: ${pixelToRemUnit(36)};
  ${({ theme }) =>
    css`
      ${theme.fonts.body3};
      line-height: normal;
    `}
`;
