import { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';
import { Button, UserImage } from '@/shared/component/Atom';
import useLogout from '@/shared/hooks/user/useLogout';
import { useAnimationHandler, useOuterClick } from '@/shared/hooks';
import ModalInput from '../Organism/MODAL/ModalInput';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '@/shared/atom/global';

interface Props {
  callback: () => void;
}

/**
 * @param callback useAnimationHandler의 handleOnAnimationEnd 전달
 */
const UserProfile = ({ callback }: Props) => {
  /**
   * TODO: 사용자 정보 nickname, email, profileImageUrl 렌더링
   */

  // ! _app.tsx에서 유저정보 fetching 후 userInfoAtom에 저장한 값 가져오기
  const userInfo = useRecoilValue(userInfoAtom);

  // ! 전부 undefined
  const { nickname, email, profileImageUrl } = userInfo;

  console.log('UserProfile', userInfo);
  console.log('UserProfile', nickname, email, profileImageUrl);

  const logout = useLogout();

  const {
    isShow,
    handleIsShow: closeUserInfo,
    handleOnAnimationEnd,
  } = useAnimationHandler(() => callback());

  // ! OuterClick 적용 안됌
  const refUserInfo = useOuterClick<HTMLDivElement>({
    callback: () => closeUserInfo,
  });

  return (
    <S.Container
      ref={refUserInfo}
      isShow={isShow}
      onAnimationEnd={handleOnAnimationEnd}
    >
      <UserImage
        src={profileImageUrl}
        size="large"
        style={{ marginBottom: 40 }}
      />
      <S.Body>
        <S.Section>
          <S.SubTitle>이름</S.SubTitle>
          <ModalInput width={246} value={nickname} disabled />
        </S.Section>
        <S.Section>
          <S.SubTitle>이메일</S.SubTitle>
          <div>{email}</div>
        </S.Section>
      </S.Body>
      <S.Control>
        <Button variant="secondary" onClick={logout}>
          로그아웃
        </Button>
        <Button
          variant="accent"
          onClick={() => {
            closeUserInfo();
          }}
        >
          완료
        </Button>
      </S.Control>
    </S.Container>
  );
};

export default UserProfile;

const S = {
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
