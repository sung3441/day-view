import styled from 'styled-components';
import { memo, useMemo } from 'react';
import { IconButton } from '@/shared/component/Molecule';
import { pixelToRemUnit } from '@/shared/styles/util';
import { useRouter } from 'next/router';
import CalendarGNB from '@/shared/component/Organism/Gnb/CalendarGnb';

interface Props {
  handleChangeTheme?: () => void;
}

const Index = ({}: Props) => {
  const { pathname } = useRouter();

  const renderContent = useMemo(() => {
    switch (pathname) {
      case '/calendar': {
        return <CalendarGNB />;
      }
      default:
        return (
          <IconButton
            type="logo"
            width={96}
            height={40}
            isActiveFnc={false}
            customStyle={{
              width: '96px',
              height: '40px',
            }}
          />
        );
    }
  }, [pathname]);

  return <Header>{renderContent}</Header>;
};
export default memo(Index);

const Header = styled.header`
  height: 100px;
  width: 100%;
  padding: ${pixelToRemUnit(30)};

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #ffffff;
  border-bottom: 1px solid #dbdbdb;
`;
