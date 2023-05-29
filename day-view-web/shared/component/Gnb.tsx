import styled from 'styled-components';
import { memo, useCallback } from 'react';
import { IconButton } from '@/shared/component/Molecule';
import { useSetRecoilState } from 'recoil';
import Tab from '@/shared/component/GnbTab';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';
import { G_isOpenChannelAtom } from '@/shared/atom/globalCalendar';
import { useRouter } from 'next/router';

interface Props {
  handleChangeTheme?: () => void;
}

const Gnb = ({ handleChangeTheme }: Props) => {
  const { pathname } = useRouter();

  const setIsOpenChannel = useSetRecoilState(G_isOpenChannelAtom);

  const handleClickMenu = useCallback(
    () => setIsOpenChannel((prev) => !prev),
    []
  );

  return (
    <Header>
      {pathname === '/calendar' ? (
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
            <Tab />
            <IconButton type="search" />
            <IconButton type="user" />
          </RightBox>
        </>
      ) : (
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
      )}
    </Header>
  );
};
export default memo(Gnb);

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
