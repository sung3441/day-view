import { ComponentPropsWithoutRef, memo } from 'react';
import styled, { css } from 'styled-components';
import { fadeIn } from '@/shared/styles/keyframes';

type InputType = ComponentPropsWithoutRef<'input'>;

interface props extends InputType {
  id: string;
  label?: string;
}

const CheckBox = ({ id, label, ...props }: props) => {
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

    transition: all 0.15s ease-in-out 0s;

    border: 1px solid rgb(212, 212, 212);
  }

  :checked + label::before {
    background: #1a73e8;
  }

  :checked + label::after {
    animation: ${fadeIn} 0.15s ease-in-out 0s;

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
