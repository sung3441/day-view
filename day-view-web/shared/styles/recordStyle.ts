import styled, { css } from 'styled-components';
import { getStyledThemProperty, pixelToRemUnit } from './util';

/**
 * 일정 & 카테고리 탭 공용 스타일
 */

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 70px);
  font-size: 1.2rem;
  color: #999;
`;

const Dates = styled.div`
  display: grid;
  grid-template-columns: ${pixelToRemUnit([38, 54])} 1fr;
  grid-auto-rows: minmax(${pixelToRemUnit(30)}, auto);
  padding: ${pixelToRemUnit([16, 24])};
  place-items: flex-start;
  align-items: center;

  gap: ${pixelToRemUnit(10)};
  border-bottom: 1px solid #dbdbdb;
  color: ${getStyledThemProperty('colors', 'Black')};
`;

const Main = styled.section`
  padding: ${pixelToRemUnit([10, 0])};
  width: 100%;
  height: 100%;
`;

const Index = styled.div<{ isToday?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  ${getStyledThemProperty('fonts', 'title2')}

  width: ${pixelToRemUnit(38)};
  height: ${pixelToRemUnit(38)};

  ${({ isToday }) =>
    isToday &&
    css`
      color: #fff;
      background-color: ${getStyledThemProperty('colors', 'main')};
      border-radius: 50%;
    `}
`;

const Day = styled.div`
  ${getStyledThemProperty('fonts', 'caption3')}
  align-self: center;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const DayDate = styled.div`
  ${getStyledThemProperty('fonts', 'caption2')}
  width: 100%;
  margin-left: ${pixelToRemUnit(100)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DateRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  div {
    width: 50%;
    ${getStyledThemProperty('fonts', 'caption2')}
    color: ${getStyledThemProperty('colors', 'Black')};
  }
`;

const RowWrap = styled.div`
  display: flex;
  align-items: center;
`;

const Dot = styled.span`
  width: ${pixelToRemUnit(12)};
  height: ${pixelToRemUnit(12)};
  background-color: ${getStyledThemProperty('colors', 'main')};
  border-radius: 50%;
`;

const Scehdule = styled.div<{ complete?: boolean }>`
  text-decoration: ${({ complete }) => complete && 'line-through'};
`;

const NoData = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  color: #999;
`;

export {
  Center,
  Dates,
  Main,
  Index,
  Day,
  DayDate,
  DateRow,
  RowWrap,
  Dot,
  Scehdule,
  NoData,
};
