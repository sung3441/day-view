import { memo, ReactNode } from 'react';
import styled from 'styled-components';
import { pixelToRemUnit } from '@/shared/styles/util';
import useDropDownContext from '@/shared/component/Organism/DropDown/hooks/useDropDownContext';

type props = {
  children?: ReactNode;
  onClick?: () => void;
};
const ListItem = ({ children, onClick }: props) => {
  const { toggleDropDown } = useDropDownContext();
  const handleClick = () => {
    onClick && onClick();
    toggleDropDown();
  };
  return <SListItem onClick={handleClick}>{children || null}</SListItem>;
};

export default memo(ListItem);

const SListItem = styled.li`
  padding: ${pixelToRemUnit([10, 12])};

  &:hover {
    background: #f3f3f3;
  }
`;
