import { memo } from 'react';
import styled, { css } from 'styled-components';
import { RecordRes } from '@/shared/types/api';
import { pixelToRemUnit } from '@/shared/styles/util';

interface Props {
  date: number;
  // 추후 키값으로 사용될 확률이 높음
  strDate: string;
  day: number;
  flag: string;
  record: RecordRes[] | undefined;
  isSelectedDay: boolean;
  handleSelectDay: (day: string) => void;
}

const Day = ({
  date,
  strDate,
  flag,
  day,
  record,
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
      {record?.map((item, idx) => (
        <Record
          key={item.recordId + idx.toString()}
          isAllday={item.allDay}
          color={item.color}
        >
          {item.title}
        </Record>
      ))}
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
  border-bottom: 1px solid #ccc;
  width: 100%;
  overflow: hidden;

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
  font-size: ${pixelToRemUnit(16)};
  margin-left: ${pixelToRemUnit(16)};
  margin-bottom: ${pixelToRemUnit(12)};
  display: flex;
  align-items: center;
  justify-content: center;

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
      color: rgba업(207, 15, 15, 0.4);
    `};
`;

const Record = styled.div<{ isAllday: boolean; color: string }>`
  width: 100%;
  height: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 4px;

  & + & {
    margin-top: 8px;
  }

  ${({ isAllday, color }) =>
    isAllday
      ? css`
          background-color: ${color};
          color: #fff;
        `
      : css`
          border-left: 4px solid ${color};
          color: black;
        `}
`;
