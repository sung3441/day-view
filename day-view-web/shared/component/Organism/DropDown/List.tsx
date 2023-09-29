import { memo, ReactNode } from 'react';
import styled from 'styled-components';
import { getStyledThemProperty } from '@/shared/styles/util';
import useDropDown from '@/shared/component/Organism/DropDown/hooks/useDropDownContext';

type props = {
  children: ReactNode;
};

const List = ({ children }: props) => {
  const { isOpen } = useDropDown();

  if (!isOpen) return null;
  return <SList>{children}</SList>;
};

export default memo(List);

const SList = styled.ul`
  position: absolute;
  z-index: 10;
  width: 116px;

  margin-top: 16px;
  border-radius: 7px;
  border: 1px solid var(--G_300, #dbdbdb);
  background: var(--White, #fff);
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);
  ${getStyledThemProperty('fonts', 'caption2')};
`;
