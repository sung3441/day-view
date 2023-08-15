import { memo } from 'react';
import styled, { css } from 'styled-components';
import { pixelToRemUnit } from '@/shared/styles/util';

interface Props {
  date: number;
  // 추후 키값으로 사용될 확률이 높음
  strDate: string;
  day: number;
  flag: string;
  isSelectedDay: boolean;
  handleSelectDay: (day: string) => void;
}

const Day = ({
  date,
  strDate,
  flag,
  day,
  isSelectedDay,
  handleSelectDay,
}: Props) => {
  return (
    <Wrap
      className={strDate}
      isRed={day === 0}
      onClick={() => handleSelectDay(strDate)}
    >
      <Date
        isSelectedDay={isSelectedDay}
        isNotThis={flag !== 'this'}
        isRed={day === 0}
      >
        {date}
      </Date>
    </Wrap>
  );
};

export default memo(Day);

const Wrap = styled.div<{
  isRed: boolean;
}>`
  z-index: 0;
  background-color: #fff;
  cursor: pointer;
  padding-left: ${pixelToRemUnit(16)};
  border-bottom: 1px solid #ccc;

  & + & {
    border-right: 1px solid #ccc;
  }

  ${({ theme }) =>
    css`
      color: ${theme.color.textColor};
    `}

  ${({ isRed }) =>
    isRed &&
    css`
      color: #cf0f0f;
      border-right: 1px solid #ccc;
    `}
`;

const Date = styled.div<{
  isSelectedDay: boolean;
  isNotThis: boolean;
  isRed: boolean;
}>`
  height: 24px;
  width: 24px;
  border-radius: 50%;
  font-weight: 400;
  font-size: 16px;

  ${({ theme, isSelectedDay }) =>
    isSelectedDay &&
    css`
      color: #fff;
      background-color: #ff7f69;
      z-index: 1;
      border-radius: 50%;
    `};

  ${({ isNotThis }) =>
    isNotThis &&
    css`
      color: rgba(34, 34, 34, 0.4);
    `};
  ${({ isRed }) =>
    isRed &&
    css`
      color: rgba(207, 15, 15, 0.4);
    `};
`;
