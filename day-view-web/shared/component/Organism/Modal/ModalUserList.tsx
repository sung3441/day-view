import styled from 'styled-components';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';
import { Button, UserImage } from '../../Atom';
import { SubscribeMembersRes } from '@/shared/types/api';

interface Props {
  members: SubscribeMembersRes['subscribers'] | undefined;
}

const ModalUserList = ({ members }: Props) => {
  if (members === undefined) return null;

  return (
    <S.UserList>
      {members?.map((member) => (
        <S.UserItem key={''}>
          <UserImage src={member.profileImageUrl} width={57} height={57} />
          <div>
            <S.Name>{member.name}</S.Name>
            <S.Email>{member.email}</S.Email>
          </div>
          <Button variant={member.auth ? 'accent' : 'primary'}>설정</Button>
        </S.UserItem>
      ))}
    </S.UserList>
  );
};

export default ModalUserList;

const UserList = styled.ul`
  display: flex;
  flex-direction: column;
  max-height: 380px;
  overflow-y: scroll;
  gap: ${pixelToRemUnit(24)};

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: #d9d9d9;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #eaeaea;
  }
`;

const UserItem = styled.li`
  display: grid;
  width: 100%;
  grid-template-columns: 57px 1fr 90px;
  align-items: center;
  grid-column-gap: 21px;
`;

const Name = styled.div`
  color: ${getStyledThemProperty('colors', 'Black')};
  ${getStyledThemProperty('fonts', 'caption1')};
  line-height: 150%;
`;

const Email = styled.div`
  color: ${getStyledThemProperty('colors', 'G_700')};
  ${getStyledThemProperty('fonts', 'caption3')};
  line-height: 150%;
`;

const S = {
  UserList,
  UserItem,
  Name,
  Email,
};
