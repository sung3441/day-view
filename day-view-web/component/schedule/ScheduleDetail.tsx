import { memo } from 'react';
import { Icon } from '@/shared/component/Atom';
import * as S from '@/shared/styles/recordStyle';
import Spinner from '@/shared/component/Atom/Spinner';

const ScheduleDetail = () => {
  // if (status === 'loading')
  //   return (
  //     <S.Center>
  //       <Spinner />
  //     </S.Center>
  //   );
  // if (data?.length === 0) return <S.Center>데이터가 없습니다.</S.Center>;

  return (
    <S.Main>
      <S.Dates>
        <S.Index isToday={false}>날짜</S.Index>
        <S.Day>월, 요일</S.Day>
        <S.DayDate>
          <S.DateRow>
            <S.RowWrap>
              <S.Dot style={{ marginRight: '12px' }} />
              <div>종일</div>
            </S.RowWrap>

            <S.RowWrap>
              <Icon
                type="sm_check"
                fill="white"
                width={12}
                height={12}
                style={{ marginRight: '6px' }}
              />

              <S.Scehdule complete={false}>일정 제목</S.Scehdule>
            </S.RowWrap>

            <S.RowWrap>
              <Icon type="sm_hamburgerMenu" style={{ marginRight: '12px' }} />
              <div>채널명</div>
            </S.RowWrap>
          </S.DateRow>
        </S.DayDate>
      </S.Dates>
    </S.Main>
  );
};

export default memo(ScheduleDetail);
