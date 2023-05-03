import { memo } from 'react';
import styled, { css } from 'styled-components';

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
      isNotThis={flag !== 'this'}
      onClick={() => handleSelectDay(strDate)}
    >
      <Date isSelectedDay={isSelectedDay}> {date}</Date>
    </Wrap>
  );
};

export default memo(Day);

const Wrap = styled.div<{
  isRed: boolean;
  isNotThis: boolean;
}>`
  padding: 4px 0 0 18px;
  ${({ theme }) =>
    css`
      color: ${theme.color.textColor};
    `}
  ${({ theme, isRed }) =>
    isRed &&
    css`
      color: ${theme.color.redColor};
    `}
  ${({ theme, isNotThis }) =>
    isNotThis &&
    css`
      opacity: 0.4;
    `}
`;

const Date = styled.div<{ isSelectedDay: boolean }>`
  height: 24px;
  width: 24px;
  border-radius: 50%;
  font-weight: 400;
  font-size: 16px;
  
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme, isSelectedDay }) =>
    isSelectedDay &&
    css`
      color: #fff;
      background-color: #ff7f69;
      //::after {
      //  content: '';
      //  position: absolute;
      //  width: 24px;
      //  height: 24px;
      //  border-radius: 50%;
      //  top: -1px;
      //  left: -7px;
      //}
      //opacity: 0.7;
    `}
  }
`;
