import React, { memo, ReactNode } from 'react';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';
import styled from 'styled-components';
import { Icon } from '@/shared/component/Atom';

type Props = {
  selectedItem: any;
  children?: ReactNode;
  displayWidth?: number | string;
  displayHeight?: number | string;
};

const DropDownTT = ({ children, selectedItem }: Props) => {
  return (
    <Display>
      <span>{selectedItem}</span>
      <Icon type="down" />
    </Display>
  );
};

const Display = styled.div`
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

export default memo(DropDownTT);

type ItemProps = {
  items: any[];
  onClick: (value: any) => void;
};

const Item = ({ items, onClick }: ItemProps) => {
  return (
    <DropDownItemsStyle>
      {items.map((value, index) => (
        <div key={value} onClick={() => onClick(value)}>
          {value!}
        </div>
      ))}
    </DropDownItemsStyle>
  );
};

const DropDownItemsStyle = styled.div`
  border-radius: 7px;
  border: 1px solid var(--G_300, #dbdbdb);
  background: var(--White, #fff);
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);
  padding: ${pixelToRemUnit([4, 16])};
  ${getStyledThemProperty('fonts', 'caption2')};
`;

export const DropDownItem = memo(Item);
