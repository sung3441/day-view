import { IconButton, SearchBar } from '@/shared/component/Molecule';
import { pixelToRemUnit } from '@/shared/styles/util';
import { memo, useCallback, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  G_isSearchKeywordAtom,
  G_isSearchOpenAtom,
} from '@/shared/component/Organism/Gnb/state';
import styled from 'styled-components';

const SearchGnb = () => {
  const [searchValue, setSearchValue] = useRecoilState(G_isSearchKeywordAtom);
  const setISearchOpen = useSetRecoilState(G_isSearchOpenAtom);

  const handleIsSearch = useCallback(() => setISearchOpen((prev) => !prev), []);

  return (
    <SearchBox>
      <IconButton
        type="left"
        onClick={handleIsSearch}
        customStyle={{ marginRight: '20px' }}
      />
      <SearchBar
        value={searchValue}
        setValue={setSearchValue}
        customStyle={{ marginLeft: pixelToRemUnit(300) }}
      />
    </SearchBox>
  );
};

export default memo(SearchGnb);

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
