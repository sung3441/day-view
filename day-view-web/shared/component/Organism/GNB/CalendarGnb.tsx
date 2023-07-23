import { memo, SyntheticEvent, useCallback } from 'react';
import { IconButton, SearchBar } from '@/shared/component/Molecule';
import GnbTab from '@/shared/component/Organism/GNB/GnbTab';
import styled from 'styled-components';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  G_isOpenChannelAtom,
  G_isSearchOpenAtom,
  G_isSearchKeywordAtom,
} from '@/shared/component/Organism/GNB/state';
import SearchSortBox from '@/shared/component/Organism/GNB/SearchSortBox';
import SearchGnb from '@/shared/component/Organism/GNB/SearchGnb';
import { useModal } from '@/shared/hooks';
import { ModalProfile } from '@/component/modal';

const CalendarGnb = () => {
  const [isSearchOpen, setISearchOpen] = useRecoilState(G_isSearchOpenAtom);
  const setIsOpenChannel = useSetRecoilState(G_isOpenChannelAtom);
  const { openModal } = useModal();

  const handleClickMenu = useCallback(
    () => setIsOpenChannel((prev) => !prev),
    []
  );

  const handleClickUser = (e?: SyntheticEvent) => {
    console.log(e);
    e?.stopPropagation();
    const target = e?.target as HTMLButtonElement;
    const { x, y } = target.getBoundingClientRect();
    openModal('Profile', { clientX: x, clientY: y });
  };

  return (
    <>
      {isSearchOpen ? (
        <SearchGnb />
      ) : (
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
      )}
      <RightBox>
        {isSearchOpen ? <SearchSortBox /> : <GnbTab />}
        <IconButton type="search" />
        <IconButton type="user" onClick={handleClickUser} />
      </RightBox>
    </>
  );
};

export default memo(CalendarGnb);

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
