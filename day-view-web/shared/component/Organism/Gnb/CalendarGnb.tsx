import { memo, SyntheticEvent, useCallback, useState } from 'react';
import { IconButton } from '@/shared/component/Molecule';
import GnbTab from '@/shared/component/Organism/Gnb/GnbTab';
import styled from 'styled-components';
import { getStyledThemProperty } from '@/shared/styles/util';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  G_isOpenChannelAtom,
  G_isSearchOpenAtom,
} from '@/shared/component/Organism/Gnb/state';
import SearchSortBox from '@/shared/component/Organism/Gnb/SearchSortBox';
import SearchGnb from '@/shared/component/Organism/Gnb/SearchGnb';
import UserProfile from '../../Molecule/UserProfile';

const CalendarGnb = () => {
  const [isSearchOpen, setISearchOpen] = useRecoilState(G_isSearchOpenAtom);
  const setIsOpenChannel = useSetRecoilState(G_isOpenChannelAtom);

  /** 사용자 정보 */
  const [isOpenUserInfo, setIsOpenUserInfo] = useState(false);

  const handleClickMenu = useCallback(
    () => setIsOpenChannel((prev) => !prev),
    []
  );

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
        <IconButton
          type="user"
          onClick={(e?: SyntheticEvent) => {
            e?.stopPropagation();
            setIsOpenUserInfo(true);
          }}
        />
        {isOpenUserInfo && (
          <UserProfile callback={() => setIsOpenUserInfo(false)} />
        )}
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
