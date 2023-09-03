import { memo } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  date: number;
  // 추후 키값으로 사용될 확률이 높음
  strDate: string;
  day: number;
  flag: string;
  isSelectedStartDay: boolean;
  isSelectedEndDay: boolean;
  handleSelectDay: (day: string) => void;
  isRangeDay: (date: string) => boolean;
}

const Date = ({
  date,
  strDate,
  flag,
  day,
  isSelectedStartDay,
  isSelectedEndDay,
  isRangeDay,
  handleSelectDay,
}: Props) => {
  return (
    <Wrap
      className={strDate}
      onClick={() => handleSelectDay(strDate)}
      isRed={day === 0}
      isNotThis={flag !== 'this'}
      isRange={isRangeDay(strDate)}
      isSelectedStartDay={isSelectedStartDay}
      isSelectedEndDay={isSelectedEndDay}
    >
      <SDate isSelectedDay={isSelectedStartDay || isSelectedEndDay}>
        {date}
      </SDate>
    </Wrap>
  );
};

export default memo(Date);

const Wrap = styled.div<{
  isRed: boolean;
  isNotThis: boolean;
  isRange: boolean;
  isSelectedStartDay: boolean;
  isSelectedEndDay: boolean;
}>`
  position: relative;
  background-color: #fff;
  cursor: pointer;

  ${({ theme }) =>
    css`
      color: ${theme.colors.Black};
    `};
  ${({ theme, isRed }) =>
    isRed &&
    css`
      color: ${theme.colors.Red};
    `};
  ${({ isNotThis }) =>
    isNotThis &&
    css`
      opacity: 0.4;
    `};
  ${({ isRange }) =>
    isRange &&
    css`
      background-color: rgba(255, 131, 109, 0.26);
    `}
  ${({ isSelectedStartDay }) =>
    isSelectedStartDay &&
    css`
      border-top-left-radius: 50%;
      border-bottom-left-radius: 50%;
    `}
${({ isSelectedEndDay }) =>
    isSelectedEndDay &&
    css`
      border-top-right-radius: 50%;
      border-bottom-right-radius: 50%;
    `}
`;

const SDate = styled.div<{ isSelectedDay: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  font-weight: 400;
  font-size: 16px;
  position: relative;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme, isSelectedDay }) =>
    isSelectedDay &&
    css`
      color: #fff;
      background-color: #ff7f69;
      opacity: 1;
    `}
`;
