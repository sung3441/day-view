import { ComponentPropsWithoutRef, memo } from 'react';
import styled from 'styled-components';

type InputType = ComponentPropsWithoutRef<'input'>;

interface props extends InputType {
  label?: string;
}

const CheckBox = ({ label, ...props }: props) => {
  return (
    <>
      <CheckBoxInput type="checkbox" {...props} />
      <CheckBoxLabel htmlFor="allCheckBox" style={{ paddingLeft: '28px' }}>
        {label}
      </CheckBoxLabel>
    </>
  );
};

export default memo(CheckBox);

export const CheckBoxInput = styled.input`
  overflow: hidden;
  position: absolute;
  top: 2px;
  left: 2px;
  z-index: -1;
  width: 1px;
  height: 1px;
  border: 0px;
  background: transparent;
  visibility: hidden;
  appearance: none;

  :checked + label::before {
    border-color: #1a73e8;
    background: #1a73e8;
  }

  :checked + label::after {
    border-color: #fff;
  }
`;

export const CheckBoxLabel = styled.label`
  display: inline-block;
  position: relative;
  z-index: 1;
  color: rgb(48, 48, 51);
  cursor: pointer;
  vertical-align: top;
  ::before {
    position: absolute;
    top: 0px;
    left: 0px;
    background: rgb(255, 255, 255);
    border: 1px solid rgb(212, 212, 212);
    border-radius: 2px;
    text-align: center;
    content: '';
    width: 22px;
    height: 22px;
    transition: all 0.25s ease 0s;
  }
  ::after {
    content: '';
    position: absolute;
    border: 0 solid rgb(212, 212, 212);
    border-image: initial;
    border-width: 0px 1.5px 1.5px 0px;
    transform: rotate(45deg);
    top: 4px;
    left: 8px;
    width: 4px;
    height: 12px;
    box-sizing: content-box;
  }
`;
