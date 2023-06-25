import styled from 'styled-components';
import { memo, useCallback } from 'react';
import { IconButton } from '@/shared/component/Molecule';
import { useSetRecoilState } from 'recoil';
import GnbTab from '@/shared/component/Organism/GNB/GnbTab';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';
import { G_isOpenChannelAtom } from '@/shared/atom/globalCalendar';
import { useRouter } from 'next/router';

interface Props {
  handleChangeTheme?: () => void;
}

const Index = ({ handleChangeTheme }: Props) => {
  const { pathname } = useRouter();
  const setIsOpenChannel = useSetRecoilState(G_isOpenChannelAtom);

  const handleClickMenu = useCallback(
    () => setIsOpenChannel((prev) => !prev),
    []
  );

  const renderContent = () => {
    switch (pathname) {
      case '/calendar': {
        return (
          <>
            <LeftBox>
              <IconButton
                type="menu"
                onClick={handleClickMenu}
                customStyle={{ marginRight: '20px' }}
              />
              <IconButton
                type="logo"
                width={96}
                height={40}
                isActiveFnc={false}
                customStyle={{
                  width: '96px',
                  height: '40px',
                  marginLeft: '20px',
                }}
              />
            </LeftBox>
            <RightBox>
              <GnbTab />
              <IconButton type="search" />
              <IconButton type="user" />
            </RightBox>
          </>
        );
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
  };

  return <Header>{renderContent()}</Header>;
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

const LeftBox = styled.div`
  ${getStyledThemProperty('box', 'flexBetweenBox')}
`;

const RightBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  > * {
    margin-left: 28px;
  }
`;
