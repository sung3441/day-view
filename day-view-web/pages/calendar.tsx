import dynamic from 'next/dynamic';
import Calendar from '@/component/calendar';
import { GetServerSidePropsContext } from 'next';
import { getAccessToken, getUser } from '@/shared/api';

import { dehydrate, QueryClient, useQuery } from 'react-query';
import { setAccessToken, setCookie } from '@/shared/util/axios';
import { QueryKeys } from '@/shared/queryClient';

const ModalRenderer = dynamic(() => import('@/component/modal/ModalRenderer'), {
  ssr: false,
});

function CalendarPage() {
  const { data } = useQuery([QueryKeys.USER], getUser);

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
  const queryClient = new QueryClient();
  try {
    setCookie(req.headers.cookie);
    const token = await getAccessToken();
    setAccessToken(token!.data.token);
    await queryClient.prefetchQuery([QueryKeys.USER], getUser);
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
