import { useRecoilState } from 'recoil';
import { tabAtom, TabType } from '@/shared/atom/tab';
import styled, { css } from 'styled-components';
import { memo } from 'react';

const tabList: TabType[] = ['월', '일정', '카테고리'];

const Tab = () => {
  const [tab, setTab] = useRecoilState(tabAtom);
  return (
    <TabStyle>
      {tabList.map((label) => (
        <TabLabel
          key={label}
          isActive={label === tab}
          onClick={() => setTab(label)}
        >
          {label}
        </TabLabel>
      ))}
    </TabStyle>
  );
};

export default memo(Tab);

const TabStyle = styled.div`
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
  transition: all 0.1s ease-out 0.02s;

  ${({ isActive }) =>
    isActive &&
    css`
      background: #000000;
      color: #ffffff;
      border: 1px solid #000000;
      z-index: 1;
    `}
`;
