import { memo, ReactNode, useCallback, useMemo, useState } from 'react';
import Display from '@/shared/component/Organism/DropDown/Display';
import { DropDownContext } from '@/shared/component/Organism/DropDown/hooks/useDropDownContext';
import List from '@/shared/component/Organism/DropDown/List';
import ListItem from '@/shared/component/Organism/DropDown/ListItem';
import styled from 'styled-components';

type props = {
  children: ReactNode;
  selectedItem: string;
};

const Main = memo(({ children, selectedItem }: props) => {
  const [isOpen, setIsOPen] = useState(false);

  const toggleDropDown = useCallback(() => {
    setIsOPen((prev) => !prev);
  }, []);

  const value = useMemo(() => {
    return {
      selectedItem,
      isOpen,
      toggleDropDown,
    };
  }, [selectedItem, isOpen, toggleDropDown]);

  return (
    <DropDownContext.Provider value={value}>
      <Wrapper>{children}</Wrapper>
    </DropDownContext.Provider>
  );
});

Main.displayName = 'DropDown';

const Wrapper = styled.div`
  position: relative;
`;

const DropDown = Object.assign(Main, {
  Display: Display,
  List: List,
  ListItem: ListItem,
});

export default DropDown;
