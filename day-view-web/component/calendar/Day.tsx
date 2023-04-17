import { memo } from "react";
import styled, { css } from "styled-components";

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
    <Date
      className={strDate}
      isRed={day === 0}
      isNotThis={flag !== "this"}
      isSelectedDay={isSelectedDay}
      onClick={() => handleSelectDay(strDate)}
    >
      {date}
    </Date>
  );
};

export default memo(Day);

const Date = styled.div<{
  isRed: boolean;
  isNotThis: boolean;
  isSelectedDay: boolean;
}>`
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
      opacity: 0.5;
    `}  
  ${({ theme, isSelectedDay }) =>
    isSelectedDay &&
    css`
      background-color: ${theme.color.shadowColor};
    `}
`;
