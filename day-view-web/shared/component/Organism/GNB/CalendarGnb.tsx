import { memo, useCallback, useState } from 'react';
import { IconButton, SearchBar } from '@/shared/component/Molecule';
import GnbTab from '@/shared/component/Organism/GNB/GnbTab';
import styled, { css, keyframes } from 'styled-components';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  G_isOpenChannelAtom,
  G_isSearchOpenAtom,
  G_isSearchKeywordAtom,
} from '@/shared/component/Organism/GNB/state';
import SearchSortBox from '@/shared/component/Organism/GNB/SearchSortBox';
import SearchGnb from '@/shared/component/Organism/GNB/SearchGnb';
import { useAnimationHandler, useOuterClick } from '@/shared/hooks';
import { Button, UserImage } from '@/shared/component/Atom';
import ModalInput from '../MODAL/ModalInput';
import useGetMember from '@/component/modal/hooks/useGetMember';

const CalendarGnb = () => {
  const [isSearchOpen, setISearchOpen] = useRecoilState(G_isSearchOpenAtom);
  const setIsOpenChannel = useSetRecoilState(G_isOpenChannelAtom);

  /** 사용자 정보 */
  // TODO: 데이터 로딩 완료 시 리렌더링, useOuterClick 제대로 안됌
  const [isOpenUserInfo, setIsOpenUserInfo] = useState(false);
  const { data, status } = useGetMember();

  const {
    isShow,
    handleIsShow: closeUserInfo,
    handleOnAnimationEnd,
  } = useAnimationHandler(() => setIsOpenChannel(false));

  const refUserInfo = useOuterClick<HTMLDivElement>({
    callback: () => closeUserInfo,
  });
  /** */

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
            setIsOpenUserInfo(!isOpenUserInfo);
          }}
        />
        {isOpenUserInfo && (
          <UserInfo.Container
            ref={refUserInfo}
            isShow={isShow}
            onAnimationEnd={handleOnAnimationEnd}
          >
            <UserImage src="" size="large" style={{ marginBottom: 40 }} />
            <UserInfo.Body>
              <UserInfo.Section>
                <UserInfo.SubTitle>이름</UserInfo.SubTitle>
                <ModalInput width={246} disabled />
              </UserInfo.Section>
              <UserInfo.Section>
                <UserInfo.SubTitle>이메일</UserInfo.SubTitle>
              </UserInfo.Section>
            </UserInfo.Body>
            <UserInfo.Control>
              <Button variant="secondary">로그아웃</Button>
              <Button
                variant="accent"
                onClick={() => {
                  setIsOpenUserInfo(false);
                }}
              >
                완료
              </Button>
            </UserInfo.Control>
          </UserInfo.Container>
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

const UserInfo = {
  Container: styled.div<{ isShow?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 50px;

    padding: ${pixelToRemUnit([60, 50])};
    border-radius: 11px;
    background-color: ${getStyledThemProperty('colors', 'White')};
    ${({ isShow }) =>
      isShow
        ? css`
            animation: ${fadeIn} 0.3s ease forwards;
          `
        : css`
            animation: ${fadeOut} 0.3s ease forwards;
          `};
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    z-index: 100;
  `,
  Body: styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-bottom: 30px;
  `,
  Section: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 38px;
  `,
  SubTitle: styled.div`
    ${getStyledThemProperty('fonts', 'caption2')};
    color: ${getStyledThemProperty('colors', 'G_700')};
  `,
  Control: styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 17px;

    width: 100%;
  `,
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;
