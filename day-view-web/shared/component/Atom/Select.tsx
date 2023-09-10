import { ComponentPropsWithoutRef, memo, ReactElement } from 'react';
import styled from 'styled-components';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';

type SelectType = ComponentPropsWithoutRef<'select'>;
interface Props extends SelectType {
  children: ReactElement<'option'>[] | undefined;
}
// 추후 드랍박스 형태로 사용하지 결정
const Select = ({ children, ...props }: Props) => {
  return <SelectBox {...props}>{children}</SelectBox>;
};

const SelectBox = styled.select`
  width: ${pixelToRemUnit(128)};
  height: 40px;

  padding: ${pixelToRemUnit(10)};

  background: ${getStyledThemProperty('colors', 'White')};
  border: 1px solid ${getStyledThemProperty('colors', 'G_500')};
  border-radius: 7px;

  appearance: none;
  :focus {
    outline: none;
  }

  background: url('/images/icon/sm_down.svg') calc(100% - 5px) center no-repeat;
  background-size: ${pixelToRemUnit(18)};
`;

export default memo(Select);
