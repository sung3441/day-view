import styled, { css } from 'styled-components';
import { PropsWithChildren } from 'react';
import Gnb from '@/shared/component/Organism/GNB';
import { useRouter } from 'next/router';

interface Props {}

const Layout = ({ children }: PropsWithChildren<Props>) => {
  const router = useRouter();

  return (
    <StyledLayout>
      <Gnb />
      <Main>{children}</Main>;
    </StyledLayout>
  );
};

export default Layout;

const StyledLayout = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Main = styled.main`
  width: 100%;
  height: calc(100% - 100px);
  ${({ theme }) =>
    css`
      background-color: ${theme.color.bgColor};
    `}
  & > div {
    width: 100%;
  }
`;
