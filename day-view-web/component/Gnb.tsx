import styled, { css } from 'styled-components';

import { memo, useState } from 'react';
import { pixelToRemUnit } from '@/shared/util/common';
import { IconButton } from '@/shared/component/Molecule';

type ActiveTabType = '월' | '일정' | '카테고리';

const tabList: ActiveTabType[] = ['월', '일정', '카테고리'];
interface Props {
  handleChangeTheme: () => void;
}

const Gnb = ({ handleChangeTheme }: Props) => {
  const [activeTab, setActiveTab] = useState<ActiveTabType>('월');

  return (
    <Header>
      <IconButton type="menu" />
      <RightBox>
        <Tab>
          {tabList.map((label) => (
            <TabLabel
              isActive={label === activeTab}
              onClick={() => setActiveTab(label)}
            >
              {label}
            </TabLabel>
          ))}
        </Tab>
        <IconButton type="search" />
        <IconButton type="user" />
      </RightBox>
    </Header>
  );
};
export default memo(Gnb);

const Header = styled.header`
  position: fixed;

  height: 100px;
  width: 100%;
  padding: ${pixelToRemUnit(30)};

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #ffffff;
`;

const RightBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  > * {
    margin-left: 28px;
  }
`;

const Tab = styled.div`
  display: flex;
  align-items: center;

  > button:nth-child(1) {
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
  }
  > button:nth-child(3) {
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
  }
`;

const TabLabel = styled.button<{ isActive?: boolean }>`
  background: #f3f3f3;
  width: 91px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 400;
  font-size: 16px;
  color: #767676;

  border: 1px solid #dbdbdb;
  transition: all 0.2s ease-out 0.05s;

  ${({ isActive }) =>
    isActive &&
    css`
      background: #000000;
      color: #ffffff;
      border: 1px solid #000000;
      z-index: 1;
    `}
`;
