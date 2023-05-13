import styled from 'styled-components';
import { memo, useCallback } from 'react';
import { pixelToRemUnit } from '@/shared/util/common';
import { IconButton } from '@/shared/component/Molecule';
import { useSetRecoilState } from 'recoil';
import { G_isOpenChannel } from '@/shared/atom/globalCalendar';
import Tab from '@/shared/component/GnbTab';

interface Props {
  handleChangeTheme?: () => void;
}

const Gnb = ({ handleChangeTheme }: Props) => {
  const setIsOpenChannel = useSetRecoilState(G_isOpenChannel);

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
