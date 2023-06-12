import { ComponentPropsWithRef, memo, useState } from 'react';
import styled from 'styled-components';
import { getStyledThemProperty } from '@/shared/styles/util';

type InputType = ComponentPropsWithRef<'input'>;

interface Props extends InputType {
  id?: string;
}

const ToggleButton = ({ id, checked = false, ...props }: Props) => {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <Label htmlFor={id}>
      <Input
        id={id}
        type="checkbox"
        defaultChecked={isChecked}
        onClick={() => {
          setIsChecked(!isChecked);
        }}
        {...props}
      />
      <Switch />
    </Label>
  );
};

export default memo(ToggleButton);

const Label = styled.label`
  gap: 10px;
  cursor: pointer;
`;

const Switch = styled.div`
  position: relative;
  width: 42px;
  height: 22px;
  background: ${getStyledThemProperty('colors', 'G_300')};
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
