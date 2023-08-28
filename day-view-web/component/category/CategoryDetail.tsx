import { memo, useCallback, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import dayjs from 'dayjs';
import { selectedCategoryIdAtom } from '@/shared/context/category/state';
import useGetRecord from '@/shared/context/record/hooks/useGetRecord';
import { selectedYYMMAtom } from '@/state/calendar';
import { selectedYYMMRecords } from '@/component/category/util';
import Spinner from '@/shared/component/Atom/Spinner';
import { RecordRes } from '@/shared/types/api';
import { createDateInfo } from '@/shared/context/date/util';
import { Icon } from '@/shared/component/Atom';
import * as S from '@/shared/styles/recordStyle';
import { useModal } from '@/shared/hooks';

type Props = {};

type CategoryDetailDateType = ReturnType<typeof createDateInfo> & RecordRes;

const CategoryDetail = ({}: Props) => {
  const { year, month } = useRecoilValue(selectedYYMMAtom);
  const selectedCategoryId = useRecoilValue(selectedCategoryIdAtom);

  const { openModal } = useModal();

  const select = useCallback(
    (data: any) => selectedYYMMRecords(data, year, month),
    [year, month]
  );

  const { data, status } = useGetRecord(selectedCategoryId, select);

  const hashData = useMemo(() => {
    if (!data) return [];
    const hash = new Map<string, CategoryDetailDateType[]>();

    data.forEach((record: RecordRes) => {
      const { startDate, endDate } = record;
      const dataInfo = createDateInfo(startDate, endDate);
      hash.has(dataInfo.key)
        ? hash.get(dataInfo.key)?.push({ ...record, ...dataInfo })
        : hash.set(dataInfo.key, [{ ...record, ...dataInfo }]);
      return hash;
    });

    return Array.from(hash).sort((a, b) => {
      const aDate = a[1][0].date;
      const bDate = b[1][0].date;
      return aDate - bDate;
    });
  }, [data]);

  if (status === 'loading')
    return (
      <S.Center>
        <Spinner />
      </S.Center>
    );

  if (data?.length === 0 || !hashData?.length)
    return <S.Center>데이터가 없습니다.</S.Center>;

  return (
    <S.Main>
      {hashData.map(([key, value], index) => {
        const { month, strDay, date } = value!.at(0) as CategoryDetailDateType;
        const today = dayjs().date();
        return (
          <S.Dates key={key}>
            <S.Index isToday={today === date}>{date}</S.Index>
            <S.Day>
              {month}월, {strDay}
            </S.Day>
            <S.DayDate>
              {value!.map((record, idx) => {
                const { startTime, endTime, allDay } = record;
                return (
                  <S.DateRow
                    key={idx}
                    onClick={(e) => {
                      const { clientX, clientY } = e;
                      const {
                        recordId,
                        title,
                        content,
                        recordImageUrl,
                        startDate,
                        endDate,
                      } = record;

                      e.stopPropagation();
                      openModal('ScheduleDetail', {
                        recordId,
                        clientX,
                        clientY,
                        title,
                        startDate: dayjs(startDate),
                        endDate: dayjs(endDate),
                        content,
                        recordImageUrl,
                      });
                    }}
                  >
                    <S.RowWrap>
                      <S.Dot style={{ marginRight: '12px' }} />
                      <div>{allDay ? '종일' : `${startTime} ~ ${endTime}`}</div>
                    </S.RowWrap>

                    <S.RowWrap>
                      {selectedCategoryId === 1 && (
                        <Icon
                          type="sm_check"
                          fill="white"
                          width={12}
                          height={12}
                          style={{ marginRight: '6px' }}
                        />
                      )}
                      <S.Scehdule complete={record.complete}>
                        {record.title}
                      </S.Scehdule>
                    </S.RowWrap>
                  </S.DateRow>
                );
              })}
            </S.DayDate>
          </S.Dates>
        );
      })}
    </S.Main>
  );
};

export default memo(CategoryDetail);
