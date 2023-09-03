import { memo, ReactNode, useMemo } from 'react';
import * as S from '@/shared/styles/recordStyle';
import { NoData } from '@/shared/styles/recordStyle';
import { scheduleYYMMAtom } from '@/shared/context/date/state';
import { useRecoilValue } from 'recoil';
import useGetSchedule from '@/shared/context/date/hooks/useGetSchedule';
import { convertTimeParam } from '@/shared/context/date/util';
import useGetDateRecord from '@/shared/context/date/hooks/useGetDateRecord';
import ScheduleDetailItem, {
  ScheduleDetailDate,
} from '@/component/schedule/ScheduleDetailItem';
import dayjs from 'dayjs';

const ScheduleDetail = () => {
  const { startDate: scheduleStartDate, endDate: scheduleEndDate } =
    useRecoilValue(scheduleYYMMAtom);

  const { data, status } = useGetSchedule({
    startDate: scheduleStartDate + convertTimeParam('0000'),
    endDate: scheduleEndDate + convertTimeParam('2359'),
  });

  const sortDate = useMemo(() => {
    if (!data) return [];
    return data.data.sort((a, b) => (a.startDate > b.startDate ? 1 : -1));
  }, [data]);

  const hashData = useGetDateRecord({ data: sortDate });

  const detailData = useMemo(() => {
    const result: ReactNode[] = [];
    if (!hashData) return [];
    if (status === 'success' && !hashData.size)
      return <NoData>데이터가 없습니다.</NoData>;

    const today = dayjs().date();
    hashData.forEach((value) => {
      const { startDate, endDate } = value[0];
      result.push(
        <S.Dates key={startDate}>
          <ScheduleDetailDate
            today={today}
            startDate={startDate}
            endDate={endDate}
          />
          <S.DayDate>
            {value.map((record) => (
              <ScheduleDetailItem key={record.recordId} record={record} />
            ))}
          </S.DayDate>
        </S.Dates>
      );
    });
    return result;
  }, [hashData, status]);

  return <S.Main>{detailData}</S.Main>;
};

export default memo(ScheduleDetail);
