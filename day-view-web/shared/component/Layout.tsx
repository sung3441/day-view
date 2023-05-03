import styled, { css } from 'styled-components';
import { PropsWithChildren } from 'react';

interface Props {}

const Layout = ({ children }: PropsWithChildren<Props>) => {
  return <Main>{children}</Main>;
};

export default Layout;

const Main = styled.main`
  width: 100%;
  min-height: calc(100% - 100px);
  ${({ theme }) =>
    css`
      background-color: ${theme.color.bgColor};
    `}
  & > div {
    width: 100%;
  }
`;
