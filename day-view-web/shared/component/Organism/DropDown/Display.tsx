import { Icon } from '@/shared/component/Atom';
import styled from 'styled-components';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';
import React, { memo } from 'react';
import { useDropDown } from '@/shared/component/Organism/DropDown/index';

const Display = () => {
  const { selectedItem } = useDropDown();
  return (
    <SDisplay>
      <span>{selectedItem}</span>
      <Icon type="down" />
    </SDisplay>
  );
};

export default memo(Display);

const SDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${pixelToRemUnit(106)};

  border-radius: 7px;
  border: 1px solid #dbdbdb;
  background: #fff;
  padding: ${pixelToRemUnit([4, 16])};
  ${getStyledThemProperty('fonts', 'caption2')};
`;
