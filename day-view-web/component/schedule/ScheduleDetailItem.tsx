import { memo } from 'react';
import * as S from '@/shared/styles/recordStyle';
import { Icon } from '@/shared/component/Atom';
import { createDateInfo } from '@/shared/context/date/util';
import { RecordRes } from '@/shared/types/api';

export const ScheduleDetailDate = ({
  today,
  startDate,
  endDate,
}: {
  today: number;
  startDate: string;
  endDate: string;
}) => {
  const { date, month, strDay, key } = createDateInfo(startDate, endDate);
  return (
    <>
      <S.Index isToday={today === date}>{date}</S.Index>
      <S.Day>
        {month}월, {strDay}
      </S.Day>
    </>
  );
};

const ScheduleDetailItem = ({ record }: { record: RecordRes }) => {
  const { startTime, endTime } = createDateInfo(
    record.startDate,
    record.endDate
  );
  return (
    <S.DateRow>
      <S.RowWrap>
        <S.Dot style={{ marginRight: '12px' }} />
        <div>{record.allDay ? '종일' : `${startTime} ~ ${endTime}`}</div>
      </S.RowWrap>
      <S.RowWrap>
        <Icon
          type="sm_check"
          fill="white"
          width={12}
          height={12}
          style={{ marginRight: '6px' }}
        />
        <S.Scehdule complete={false}>{record.title}</S.Scehdule>
      </S.RowWrap>
      <S.RowWrap>
        <Icon type="sm_hamburgerMenu" style={{ marginRight: '12px' }} />
        <div>{record.channelName}</div>
      </S.RowWrap>
    </S.DateRow>
  );
};

export default memo(ScheduleDetailItem);
