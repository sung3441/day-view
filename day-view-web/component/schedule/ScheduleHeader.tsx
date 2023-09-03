import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { getStyledThemProperty } from '@/shared/styles/util';
import { scheduleYYMMAtom } from '@/shared/context/date/state';
import { SyntheticEvent, useCallback, useState } from 'react';
import CommonCalendar from '@/shared/component/Organism/CommonCalendar';
import { getStrYYMM } from '@/shared/context/date/util';

interface Props {}

const ScheduleHeader = ({}: Props) => {
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [{ startDate, endDate }, setscheduleYYMM] =
    useRecoilState(scheduleYYMMAtom);

  const handelIsOpenCalendar = useCallback(
    (isOpen: boolean, e?: SyntheticEvent) => {
      e?.stopPropagation();
      setIsOpenCalendar(isOpen);
    },
    []
  );

  const onSelectDay = useCallback((sDate: string, eDate?: string) => {
    if (!sDate) return;
    setscheduleYYMM((prev) => ({
      ...prev,
      startDate: sDate || prev.startDate,
      endDate: eDate || prev.endDate,
    }));
  }, []);

  return (
    <Wrap onClick={(e) => handelIsOpenCalendar(true, e)}>
      <div>{getStrYYMM(startDate)}</div>
      &nbsp; - &nbsp;
      <div>{getStrYYMM(endDate)}</div>
      {isOpenCalendar && (
        <CommonCalendar
          closeCalendar={() => handelIsOpenCalendar(false)}
          onSelectDay={onSelectDay}
          customStyle={{
            top: '60px',
            left: '3vw',
          }}
        />
      )}
    </Wrap>
  );
};

export default ScheduleHeader;

const Wrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  ${getStyledThemProperty('layout', 'pageHeader')};
  ${getStyledThemProperty('fonts', 'title1')};
`;
