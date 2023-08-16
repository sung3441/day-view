import { Fragment, memo, useCallback, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedCategoryIdAtom } from '@/shared/context/category/state';
import useGetRecord from '@/shared/context/record/hooks/useGetRecord';
import { selectedYYMMAtom } from '@/state/calendar';
import { selectedYYMMRecords } from '@/component/category/util';
import styled from 'styled-components';
import Spinner from '@/shared/component/Atom/Spinner';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';
import { RecordRes } from '@/shared/types/api';
import { createDateInfo } from '@/shared/context/date/util';

type Props = {};

type CategoryDetailDateType = ReturnType<typeof createDateInfo> & RecordRes;

const CategoryDetail = ({}: Props) => {
  const { year, month } = useRecoilValue(selectedYYMMAtom);
  const selectedCategoryId = useRecoilValue(selectedCategoryIdAtom);

  const select = useCallback(
    (data: any) => selectedYYMMRecords(data, year, month),
    [year, month]
  );

  const { data, status } = useGetRecord(selectedCategoryId, select);

  const hashData = useMemo(() => {
    const hash = new Map<string, CategoryDetailDateType[]>();
    if (!data) return;
    data.forEach((record: RecordRes) => {
      const { startDate, endDate } = record;
      const dataInfo = createDateInfo(startDate, endDate);
      hash.has(dataInfo.key)
        ? hash.get(dataInfo.key)?.push({ ...record, ...dataInfo })
        : hash.set(dataInfo.key, [{ ...record, ...dataInfo }]);
      return hash;
    });
    return hash;
  }, [data]);

  if (status === 'loading')
    return (
      <Center>
        <Spinner />
      </Center>
    );
  if (data?.length === 0 || !hashData?.size)
    return <Center>데이터가 없습니다.</Center>;

  return (
    <Main>
      {Array.from(hashData).map(([key, value], index) => {
        const { month, strDay } = value!.at(0) as CategoryDetailDateType;
        return (
          <Dates key={key}>
            <Index>{index}</Index>
            <Day>
              {month}월,{strDay}
            </Day>
            <DayDate>
              {value!.map((record, idx) => {
                const { startTime, endTime, allDay } = record;
                return (
                  <DateRow key={idx}>
                    <div>{allDay ? '종일' : `${startTime} ~ ${endTime}`}</div>
                    <div key={idx}>{record.title}</div>
                  </DateRow>
                );
              })}
            </DayDate>
          </Dates>
        );
      })}
    </Main>
  );
};

export default memo(CategoryDetail);

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
  grid-template-columns: ${pixelToRemUnit([30, 54, 500])};
  grid-auto-rows: minmax(${pixelToRemUnit(30)}, auto);
  padding: ${pixelToRemUnit([16, 24])};
  place-items: flex-start;

  gap: ${pixelToRemUnit(10)};
  border-bottom: 1px solid #dbdbdb;
  color: #222;
`;

const Main = styled.section`
  padding: ${pixelToRemUnit([10, 0])};
`;

const Index = styled.div`
  font-size: ${pixelToRemUnit(24)};
  font-weight: 700;
  width: 100%;
  height: 40px;
`;

const Day = styled.div`
  font-size: ${pixelToRemUnit(12)};
  font-weight: 500;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
`;

const DayDate = styled.div`
  width: 100%;
  margin-left: 100px;
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
    font-size: 16px;
    font-weight: 400;
    width: 50%;
  }
`;
