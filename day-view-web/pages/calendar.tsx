import dynamic from 'next/dynamic';
import Calendar from '@/component/calendar';
import { GetServerSidePropsContext } from 'next';
import { getAccessToken, getUser } from '@/shared/api';

import { dehydrate, QueryClient, useQuery } from 'react-query';
import {
  isSetAccessToken,
  setAccessToken,
  setCookie,
} from '@/shared/util/auth';
import { QueryKeys } from '@/shared/queryClient';
import CommonCalendar from '@/shared/component/Organism/CommonCalendar';

const ModalRenderer = dynamic(() => import('@/component/modal/ModalRenderer'), {
  ssr: false,
});

function CalendarPage() {
  return (
    <>
      <Calendar />
      <ModalRenderer />
      <CommonCalendar />
    </>
  );
}

export default CalendarPage;

export const getServerSideProps = async ({
  req,
  res,
  ...rest
}: GetServerSidePropsContext) => {
  const queryClient = new QueryClient();
  try {
    const isAllowLogin = await isSetAccessToken(req?.headers?.cookie || '');
    if (!isAllowLogin) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      };
    }

    await queryClient.prefetchQuery([QueryKeys.USER], getUser);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
};
