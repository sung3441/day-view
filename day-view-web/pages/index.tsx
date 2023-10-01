import { GetServerSidePropsContext } from 'next';
import Main from '../component/mainPage';
import styled from 'styled-components';
import { getStyledThemProperty } from '@/shared/styles/util';
import { isSetAccessToken } from '@/shared/util/auth';
import { NextSeo } from 'next-seo';

export default function Home() {
  return (
    <>
      <NextSeo title="메인" description="day-view 공유캘린더" />
      <MainWrap>
        <Main />
      </MainWrap>
    </>
  );
}

const MainWrap = styled.div`
  height: 100%;
  ${getStyledThemProperty('box', 'flexCenterBox')};
  flex-direction: column;
`;

export const getServerSideProps = async ({
  req,
  res,
  ...rest
}: GetServerSidePropsContext) => {
  try {
    const isAllowLogin = await isSetAccessToken(req?.headers?.cookie || '');
    if (isAllowLogin) {
      return {
        redirect: {
          permanent: false,
          destination: '/calendar',
        },
      };
    }
  } catch (e) {}
  return {
    props: {},
  };
};
