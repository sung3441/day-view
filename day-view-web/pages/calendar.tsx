import dynamic from 'next/dynamic';
import Calendar from '@/component/calendar';

const ModalRenderer = dynamic(() => import('@/component/modal/ModalRenderer'), {
  ssr: false,
});

function CalendarPage() {
  return (
    <>
      <Calendar />
      <ModalRenderer />
    </>
  );
}

export default CalendarPage;
