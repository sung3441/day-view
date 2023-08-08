import { SyntheticEvent, useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';
import { Button, UserImage } from '@/shared/component/Atom';
import useLogout from '@/shared/hooks/user/useLogout';
import { useAnimationHandler, useOuterClick } from '@/shared/hooks';
import ModalInput from '../Organism/MODAL/ModalInput';
import useGetUserInfo from '@/shared/context/user/hooks/useGetUserInfo';
import useValidation from '@/shared/hooks/useValidation';
import usePatchUserInfo from '@/shared/context/user/hooks/usePatchUserInfo';

interface Props {
  callback: () => void;
}

/**
 * @param callback useAnimationHandler의 handleOnAnimationEnd 전달
 */
const UserProfile = ({ callback }: Props) => {
  const {
    isShow,
    handleIsShow: closeUserInfo,
    handleOnAnimationEnd,
  } = useAnimationHandler(() => callback());

  const ref = useOuterClick<HTMLDivElement>({
    callback: closeUserInfo,
  });

  const { data: userInfo } = useGetUserInfo((data) => data);
  const { nickname, email, birthday, profileImageUrl } = userInfo;
  const { mutate, status } = usePatchUserInfo();

  const logout = useLogout();

  const [value, setValue] = useState(nickname);
  const { isValid, validate } = useValidation('isNameDifferent');
  const { isValid: isEmpty, validate: validateEmpty } = useValidation('empty');

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    validate([nickname, target.value]);
    validateEmpty(target.value);
    setValue(target.value);
  };

  return (
    <S.Container
      ref={ref}
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
          <ModalInput onChange={handleChange} width={246} value={value} />
        </S.Section>
        <S.Section>
          <S.SubTitle>이메일</S.SubTitle>
          <S.Email>{email}</S.Email>
        </S.Section>
      </S.Body>
      <S.Control>
        <Button variant="secondary" onClick={logout}>
          로그아웃
        </Button>
        <Button
          variant="accent"
          onClick={() => {
            mutate({ nickname: value, birthday, profileImageUrl });
            closeUserInfo();
          }}
          disabled={!isValid || !isEmpty}
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
  Email: styled.div`
    ${getStyledThemProperty('fonts', 'caption2')};
    color: ${getStyledThemProperty('colors', 'Black')};
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
