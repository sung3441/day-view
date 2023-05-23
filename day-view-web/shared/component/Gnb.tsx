import styled from 'styled-components';
import { memo, useCallback } from 'react';
import { IconButton } from '@/shared/component/Molecule';
import { useSetRecoilState } from 'recoil';
import Tab from '@/shared/component/GnbTab';
import { pixelToRemUnit } from '@/shared/styles/util';
import { G_isOpenChannelAtom } from '@/shared/atom/globalCalendar';

interface Props {
  handleChangeTheme?: () => void;
}

const Gnb = ({ handleChangeTheme }: Props) => {
  const setIsOpenChannel = useSetRecoilState(G_isOpenChannelAtom);

  const handleClickMenu = useCallback(
    () => setIsOpenChannel((prev) => !prev),
    []
  );

  return (
    <Header>
      <IconButton type="menu" onClick={handleClickMenu} />
      <RightBox>
        <Tab />
        <IconButton type="search" />
        <IconButton type="user" />
      </RightBox>
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

const RightBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  > * {
    margin-left: 28px;
  }
`;
