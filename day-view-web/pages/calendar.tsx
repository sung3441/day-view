import dynamic from 'next/dynamic';
import Calendar from '@/component/calendar';
import { GetServerSidePropsContext } from 'next';

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

export const getServerSideProps = async ({
  req,
  res,
  ...rest
}: GetServerSidePropsContext) => {
  console.log('reqreqreq', req);
  return {
    props: {},
  };
};
