import { ComponentPropsWithoutRef, memo } from 'react';
import styled, { css } from 'styled-components';
import { fadeIn } from '@/shared/styles/keyframes';
import { toRGBA } from '@/shared/util/colorInfo';

type InputType = ComponentPropsWithoutRef<'input'>;

interface props extends InputType {
  id: string;
  label?: string;
}

const CheckBox = ({ id, label, ...props }: props) => {
  const t = toRGBA('rgba(173, 20, 87)', 1);
  return (
    <>
      <CheckBoxInput id={id} type="checkbox" {...props} />
      <CheckBoxLabel htmlFor={id}>{label}</CheckBoxLabel>
    </>
  );
};

export default memo(CheckBox);

export const CheckBoxInput = styled.input`
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

    width: 28px;
    height: 28px;

    border-radius: 7px;
    background-color: #fff;

    transition: background-color 0.2s ease-in-out 0s;

    border: 2px solid ${toRGBA('rgba(173, 20, 87)', 0.26)};
  }

  :checked + label::before {
    background-color: ${toRGBA('rgba(173, 20, 87)', 0.26)};
    border-style: none;
  }

  :checked + label::after {
    animation: ${fadeIn} 0.15s ease-in-out 0s forwards;

    content: '';
    position: absolute;
    transform: rotate(45deg);
    top: 7px;
    left: 10px;
    width: 3px;
    height: 10px;
    box-sizing: content-box;

    border-style: solid;
    border-image: initial;
    border-width: 0 4px 4px 0;
    border-color: rgba(173, 20, 87, 1);
  }
`;

export const CheckBoxLabel = styled.label`
  position: relative;
  cursor: pointer;
  z-index: 1;
  padding-left: 36px;
  ${({ theme }) =>
    css`
      ${theme.fonts.body3};
      line-height: normal;
    `}
`;
