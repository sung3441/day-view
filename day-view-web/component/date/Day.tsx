import { memo, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import { RecordRes } from '@/shared/types/api';
import { pixelToRemUnit } from '@/shared/styles/util';
import { useRecoilValue } from 'recoil';
import { dayHeightAtom } from '@/shared/context/date/state';
import dayjs from 'dayjs';
import { useModal } from '@/shared/hooks';
import { Icon } from '@/shared/component/Atom';

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
  const innerHeight = useRecoilValue(dayHeightAtom);
  const { openModal } = useModal();

  const { availableCount, restCount } = useMemo(() => {
    if (record === undefined || !innerHeight)
      return {
        availableCount: 0,
        restCount: 0,
      };

    // res높이 20 + 6
    const fixeHeight = 30;
    const headerHeight = 36;
    const realHeight = innerHeight - headerHeight;

    if (record.length * fixeHeight > realHeight) {
      const availableCount = Math.floor(realHeight / fixeHeight) - 1;
      return {
        availableCount: availableCount,
        restCount: record.length - availableCount,
      };
    }

    return {
      availableCount: record.length,
      restCount: 0,
    };
  }, [record, innerHeight]);

  return (
    <Wrap
      className={strDate}
      isRed={day === 0}
      onClick={() => handleSelectDay(strDate)}
      height={innerHeight}
    >
      <Date
        isSelectedDay={isSelectedDay}
        isNotThis={flag !== 'this'}
        isRed={day === 0}
      >
        {date}
      </Date>
      {!!availableCount &&
        record?.slice(0, availableCount)?.map((item, idx) => (
          <Record
            key={item.recordId + idx.toString()}
            isAllday={item.allDay}
            color={item.color}
            onClick={(e: React.MouseEvent) => {
              const { clientX, clientY } = e;
              const {
                recordId,
                title,
                content,
                complete,
                recordImageUrl,
                startDate,
                endDate,
                channelName,
              } = item;

              e.stopPropagation();
              openModal('ScheduleDetail', {
                recordId,
                clientX,
                clientY,
                title,
                startDate,
                endDate,
                content,
                complete,
                recordImageUrl,
                channelName,
              });
            }}
          >
            <p>{item.title}</p>
          </Record>
        ))}
      {record?.length && restCount > 0 && (
        <Record isAllday={false} color={record![0]!.color}>
          <p>{restCount}개 더보기</p>
        </Record>
      )}
    </Wrap>
  );
};

export default memo(Day);

const Wrap = styled.div<{
  height: number;
  isRed: boolean;
}>`
  z-index: 0;
  background-color: #fff;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
  width: 100%;
  overflow: hidden;
  height: ${({ height }) => height}px;

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
  margin-top: 6px;
  margin-left: ${pixelToRemUnit(12)};
  margin-bottom: 6px;

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
  width: calc(100% - ${pixelToRemUnit(12)});
  height: 24px;
  padding: ${pixelToRemUnit([2, 0, 2, 4])};
  position: initial;
  display: flex;
  align-items: center;
  font-size: ${pixelToRemUnit(12)};

  & + & {
    margin-top: 6px;
  }

  > p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }

  ${({ isAllday, color }) =>
    isAllday
      ? css`
          background-color: ${color};
          color: #fff;
          border-top-right-radius: 6px;
          border-bottom-right-radius: 6px;
        `
      : css`
          border-left: 4px solid ${color};
          color: black;
        `}
`;
