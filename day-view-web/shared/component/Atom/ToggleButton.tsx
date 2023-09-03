import { ComponentPropsWithRef, memo, useState } from 'react';
import styled from 'styled-components';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';

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
  gap: ${pixelToRemUnit(10)};
  cursor: pointer;
  width: ${pixelToRemUnit(42)};
  height: ${pixelToRemUnit(22)};
`;

const Switch = styled.div`
  position: relative;
  width: ${pixelToRemUnit(42)};
  height: ${pixelToRemUnit(22)};
  background: ${getStyledThemProperty('colors', 'G_300')};
  border-radius: 32px;
  padding: ${pixelToRemUnit(4)};
  transition: 250ms all;

  &:before {
    transition: 250ms all;
    content: '';
    position: absolute;
    width: ${pixelToRemUnit(16)};
    height: ${pixelToRemUnit(16)};
    border-radius: 35px;
    top: 50%;
    left: ${pixelToRemUnit(4)};
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
      transform: translate(${pixelToRemUnit(18)}, -50%);
    }
  }
`;
