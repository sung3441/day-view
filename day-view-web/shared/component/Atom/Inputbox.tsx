import {
  ComponentPropsWithoutRef,
  memo,
  forwardRef,
  ForwardedRef,
} from 'react';
import styled from 'styled-components';
import { common } from '@/shared/styles/theme';

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

  width: 277px;
  height: 40px;

  color: ${common.colors.Black};
  background: ${common.colors.White};

  border: none;
  outline: none;

  ${common.fonts.body3};

  ::placeholder {
    color: ${common.colors.G_700};
  }
`;
