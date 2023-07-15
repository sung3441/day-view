import { memo, useCallback } from 'react';
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

const CalendarGnb = () => {
  const [isSearchOpen, setISearchOpen] = useRecoilState(G_isSearchOpenAtom);
  const setIsOpenChannel = useSetRecoilState(G_isOpenChannelAtom);
  const { openModal } = useModal();

  const handleClickMenu = useCallback(
    () => setIsOpenChannel((prev) => !prev),
    []
  );

  const handleIsSearch = useCallback(() => setISearchOpen((prev) => !prev), []);

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
        <IconButton type="search" onClick={handleIsSearch} />
        <IconButton
          type="user"
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
            openModal('Profile', { clientX: e.clientX, clientY: e.clientY });
          }}
        />
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
