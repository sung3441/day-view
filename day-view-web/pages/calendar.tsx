import dynamic from 'next/dynamic';
import Calendar from '@/component/calendar';
import { GetServerSidePropsContext } from 'next';
import { getAccessToken, getUser } from '@/shared/api';
import * as cookie from 'cookie';

import { cookies } from 'next/headers';
import { dehydrate, QueryClient } from 'react-query';
import Auth from '@/shared/axios';
import { setCookie } from '@/shared/util/axios';
import axios from 'axios';

const ModalRenderer = dynamic(() => import('@/component/modal/ModalRenderer'), {
  ssr: false,
});

function CalendarPage() {
  return (
    <>
      <button onClick={getAccessToken}>tttt</button>
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
  try {
    setCookie(req.headers.cookie);
    const token = await getAccessToken();
    console.log('token', token);
    // const userData = await getUser();
    // console.log('userData', userData);
  } catch (e) {
    // console.log('e', e);
  }

  // const queryClient = new QueryClient();
  // await queryClient.prefetchQuery(['user'], getUser);

  return {
    props: {
      // dehydratedState: dehydrate(queryClient),
    },
  };
};
