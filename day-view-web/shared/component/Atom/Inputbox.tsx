import React from 'react';
import styled from 'styled-components';

type InputProps = React.ComponentPropsWithoutRef<'input'>;

const InputBox = (
  { type, ...props }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  return <InputStyle type={type} ref={ref} {...props} />;
};

export default React.memo(React.forwardRef(InputBox));

const InputStyle = styled.input`
  display: flex;
  align-items: center;

  width: 277px;
  height: 40px;

  color: #222222;
  background: #ffffff;

  border: none;
  outline: none;

  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 200%;

  ::placeholder {
    /* G_700 */
    color: #767676;
  }
`;
