import { memo } from 'react';
import * as S from '@/shared/styles/recordStyle';
import { useDateParam } from '@/shared/context/date/hooks/useDate';
import useGetDateRecord from '@/shared/context/date/hooks/useGetDateRecord';

const ScheduleDetail = () => {
  const { startDate, endDate } = useDateParam();
  const data = useGetDateRecord({ startDate, endDate });

  console.log(data);
  // if (status === 'loading')
  //   return (
  //     <S.Center>
  //       <Spinner />
  //     </S.Center>
  //   );
  // if (data?.length === 0) return <S.Center>데이터가 없습니다.</S.Center>;

  return <S.Main></S.Main>;
};

export default memo(ScheduleDetail);
