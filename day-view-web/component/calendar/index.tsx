import styled from 'styled-components';
import Channel from '@/component/calendar/channelSection';
import DateSection from '@/component/calendar/dateSection/DateSection';

const Calendar = () => {
  return (
    <CalderWrap>
      <Channel />
      <DateSection />
    </CalderWrap>
  );
};
export default Calendar;

const CalderWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: calc(100vh - 100px);
`;
