import { ComponentPropsWithRef } from 'react';
import styled, { css } from 'styled-components';

type InputType = ComponentPropsWithRef<'input'>;

interface Props extends InputType {
  id?: string;
}

const ToggleButton = ({ id, ...props }: Props) => {
  return (
    <Label>
      <Input id={id} type="checkbox" {...props} />
      <Switch />
    </Label>
  );
};

export default ToggleButton;

const Label = styled.label`
  gap: 10px;
  cursor: pointer;
`;

const Switch = styled.div`
  position: relative;
  width: 42px;
  height: 22px;
  background: #b3b3b3;
  border-radius: 32px;
  padding: 4px;
  transition: 250ms all;

  &:before {
    transition: 250ms all;
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 35px;
    top: 50%;
    left: 4px;
    background: white;
    transform: translate(0, -50%);
  }
`;

const Input = styled.input`
  position: absolute;
  opacity: 0;

  &:checked + ${Switch} {
    background: ${({ theme }) => theme.colors.main};

    &:before {
      transform: translate(18px, -50%);
    }
  }
`;
