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
import SearchSortBox from '@/shared/component/Organism/GNB/SearchBox';

const CalendarGNB = () => {
  const [isSearchOpen, setISearchOpen] = useRecoilState(G_isSearchOpenAtom);
  const [searchValue, setSearchValue] = useRecoilState(G_isSearchKeywordAtom);
  const setIsOpenChannel = useSetRecoilState(G_isOpenChannelAtom);

  const handleClickMenu = useCallback(
    () => setIsOpenChannel((prev) => !prev),
    []
  );

  const handleClickSearch = useCallback(
    () => setISearchOpen((prev) => !prev),
    []
  );

  return (
    <>
      {isSearchOpen ? (
        <SearchBox>
          <IconButton
            type="left"
            onClick={handleClickSearch}
            customStyle={{ marginRight: '20px' }}
          />
          <SearchBar
            value={searchValue}
            setValue={setSearchValue}
            customStyle={{ marginLeft: pixelToRemUnit(300) }}
          />
        </SearchBox>
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
        <IconButton type="search" onClick={handleClickSearch} />
        <IconButton type="user" />
      </RightBox>
    </>
  );
};

export default memo(CalendarGNB);

const LeftBox = styled.div`
  ${getStyledThemProperty('box', 'flexBetweenBox')}
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RightBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  > * {
    margin-left: 28px;
  }
`;
