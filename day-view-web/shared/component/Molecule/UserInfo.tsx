import styled from 'styled-components';
import { UserImage } from '../Atom';
import { getStyledThemProperty } from '@/shared/styles/util';

interface Props {
  src: string;
  name: string;
  email: string;
}

const UserInfo = ({ src, name, email }: Props) => {
  return (
    <S.Container>
      <UserImage src={src} />
      <div>
        <S.Name>{name}</S.Name>
        <S.Email>{email}</S.Email>
      </div>
    </S.Container>
  );
};

export default UserInfo;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 21px;
`;

const Name = styled.div`
  ${getStyledThemProperty('fonts', 'caption1')}
  color: ${getStyledThemProperty('colors', 'Black')}
`;

const Email = styled.div`
  ${getStyledThemProperty('fonts', 'caption3')}
  color: ${getStyledThemProperty('colors', 'G_700')}
`;

const S = {
  Container,
  Name,
  Email,
};
