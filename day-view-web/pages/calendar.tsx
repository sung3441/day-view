import dynamic from 'next/dynamic';
import Calendar from '@/component/calendar';
import { GetServerSidePropsContext } from 'next';
import { getUser } from '@/shared/api';
import * as cookie from 'cookie';

import { cookies } from 'next/headers';
import { dehydrate, QueryClient } from 'react-query';
import Auth from '@/shared/axios';
import { setCookie } from '@/shared/util/axios';

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
  setCookie(req.headers.cookie);
  const userData = await getUser();
  console.log(userData);

  // const queryClient = new QueryClient();
  // await queryClient.prefetchQuery(['user'], getUser);

  return {
    props: {
      // dehydratedState: dehydrate(queryClient),
    },
  };
};
