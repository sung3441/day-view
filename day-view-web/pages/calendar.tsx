import dynamic from 'next/dynamic';
import Calendar from '@/component/calendar';
import { GetServerSidePropsContext } from 'next';
import { getChannel, getRecordInSubscribe, getUser } from '@/shared/api';

import { dehydrate, QueryClient } from 'react-query';
import { isSetAccessToken } from '@/shared/util/auth';
import { QueryKeys } from '@/shared/queryClient';
import {
  addZeroPad,
  covertDateParam,
  getTodayYYMM,
} from '@/shared/context/date/util';
import { ChannelSelectType } from '@/shared/types/api';

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

    const { year, month } = getTodayYYMM();
    const startDate = covertDateParam({ year, month, date: 1 });
    const endDate = covertDateParam({
      year,
      month,
      isLastDay: true,
    });

    await queryClient.prefetchQuery(
      [QueryKeys.DATE, year.toString(), addZeroPad(month)],
      () => getRecordInSubscribe({ startDate, endDate })
    );

    const channels: ChannelSelectType[] = ['MANAGE', 'SUBSCRIBE', 'GOOGLE'];

    await Promise.all(
      channels.map(async (channel) => {
        await queryClient.prefetchQuery([QueryKeys.CHANNEL, channel], () =>
          getChannel(channel)
        );
      })
    );

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
