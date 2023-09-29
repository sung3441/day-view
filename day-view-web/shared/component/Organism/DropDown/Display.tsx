import { Icon } from '@/shared/component/Atom';
import styled from 'styled-components';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';
import React, { memo } from 'react';
import useDropDown from '@/shared/component/Organism/DropDown/hooks/useDropDownContext';

const Display = () => {
  const { selectedItem, toggleDropDown } = useDropDown();
  return (
    <SDisplay onClick={toggleDropDown}>
      <span>{selectedItem}</span>
      <Icon type="down" />
    </SDisplay>
  );
};

export default memo(Display);

const SDisplay = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 116px;

  border-radius: 7px;
  border: 1px solid #dbdbdb;
  background: #fff;
  padding: ${pixelToRemUnit([4, 12])};
  ${getStyledThemProperty('fonts', 'caption2')};
`;
