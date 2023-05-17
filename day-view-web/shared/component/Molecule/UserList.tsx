import styled from 'styled-components';
import { Icon, UserImage } from '@/shared/component/Atom/';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';
import { memo } from 'react';

interface Props {
  users: { id: string; name: string; src: string }[];
}

/**
 * TODO: Refactor
 */
const UserList = ({ users }: Props) => {
  const MAX_LENGTH = 5;

  return (
    <S.Layout>
      {users.slice(0, MAX_LENGTH).map((user) => (
        <S.User key={user.id}>
          <UserImage src="" size="small" />
          <div>{user.name}</div>
        </S.User>
      ))}
      <S.Circle>
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

  User: styled.div`
    text-align: center;
  `,

  Circle: styled.div`
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
