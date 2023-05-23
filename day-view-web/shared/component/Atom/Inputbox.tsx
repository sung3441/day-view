import {
  ComponentPropsWithoutRef,
  memo,
  forwardRef,
  ForwardedRef,
} from 'react';
import styled from 'styled-components';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';

type InputProps = ComponentPropsWithoutRef<'input'>;

const InputBox = (
  { type, ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  return <InputStyle type={type} ref={ref} {...props} />;
};

export default memo(forwardRef(InputBox));

const InputStyle = styled.input`
  display: flex;
  align-items: center;

  width: ${pixelToRemUnit(277)};
  height: ${pixelToRemUnit(40)};
  color: ${getStyledThemProperty('colors', 'Black')};
  background: ${getStyledThemProperty('colors', 'White')};

  border: none;
  outline: none;

  ${getStyledThemProperty('fonts', 'body3')};

  ::placeholder {
    color: ${getStyledThemProperty('colors', 'G_700')};
  }
`;
