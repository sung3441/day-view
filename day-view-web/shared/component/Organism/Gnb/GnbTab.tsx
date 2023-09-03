import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import { memo } from 'react';
import { G_tabAtom, TabType } from '@/shared/component/Organism/Gnb/state';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';

const tabList: TabType[] = ['월', '일정', '카테고리'];

const Tab = () => {
  const [tab, setTab] = useRecoilState(G_tabAtom);
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
  width: ${pixelToRemUnit(91)};
  height: ${pixelToRemUnit(40)};

  display: flex;
  align-items: center;
  justify-content: center;

  ${getStyledThemProperty('fonts', 'caption2')};
  color: ${getStyledThemProperty('colors', 'G_700')};

  border: 1px solid ${getStyledThemProperty('colors', 'G_300')};
  transition: all 0.1s ease-out 0.02s;

  ${({ isActive }) =>
    isActive &&
    css`
      ${getStyledThemProperty('fonts', 'caption1')};
      background: #000000;
      color: #ffffff;
      border: 1px solid #000000;
      z-index: 1;
    `}
`;
