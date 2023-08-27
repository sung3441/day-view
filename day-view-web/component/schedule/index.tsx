import { memo } from 'react';
import ScheduleHeader from './ScheduleHeader';
import ScheduleDetail from './ScheduleDetail';

const Schedule = () => {
  return (
    <>
      <ScheduleHeader />
      <ScheduleDetail />
    </>
  );
};

export default memo(Schedule);
