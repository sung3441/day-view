import dynamic from 'next/dynamic';
import Calendar from '@/component/calendar';
import { GetServerSidePropsContext } from 'next';
import { getAccessToken, getUser } from '@/shared/api';

import { dehydrate, QueryClient, useQuery } from 'react-query';
import {
  isSetAccessToken,
  setAccessToken,
  setCookie,
} from '@/shared/util/axios';
import { QueryKeys } from '@/shared/queryClient';

const ModalRenderer = dynamic(() => import('@/component/modal/ModalRenderer'), {
  ssr: false,
});

function CalendarPage() {
  const { data } = useQuery([QueryKeys.USER], getUser);
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
