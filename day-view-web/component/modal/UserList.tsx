import { memo } from 'react';
import styled from 'styled-components';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';
import { Icon, UserImage } from '@/shared/component/Atom/';
import { useModal } from '@/shared/hooks';

const MAX_LENGTH = 5;

interface Props {
  users: { id: string; name: string; src: string }[];
}

const UserList = ({ users }: Props) => {
  const { openModal } = useModal();

  return (
    <S.Layout>
      {users.slice(0, MAX_LENGTH).map((user) => (
        <S.UserWrap key={user.id}>
          <UserImage src="" size="small" />
          <S.Name>{user.name}</S.Name>
        </S.UserWrap>
      ))}
      <S.Circle onClick={() => openModal('EditorList')}>
        {users.length <= MAX_LENGTH ? (
          <Icon type="sm_plus" />
        ) : (
          `+${users.length - MAX_LENGTH}`
        )}
      </S.Circle>
    </S.Layout>
  );
};

export default memo(UserList);

const S = {
  Layout: styled.div`
    display: flex;
    gap: 10px;
  `,

  UserWrap: styled.div`
    text-align: center;
  `,

  Circle: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    width: ${pixelToRemUnit(48)};
    height: ${pixelToRemUnit(48)};

    border: 1px solid ${getStyledThemProperty('colors', 'G_300')};
    border-radius: 50%;

    background-color: #fff;
    color: ${getStyledThemProperty('colors', 'Black')};

    ${getStyledThemProperty('fonts', 'caption3')};
    color: ${getStyledThemProperty('colors', 'Black')};
  `,

  Name: styled.div`
    ${getStyledThemProperty('fonts', 'caption3')};
    color: ${getStyledThemProperty('colors', 'Black')};
  `,
};
