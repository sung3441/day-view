import { memo, useState } from 'react';
import Modal from '../../shared/component/Organism/Modal';
import { useAnimationHandler, useOuterClick } from '@/shared/hooks';
import { ModalProps } from './ModalRenderer';
import styled, { css } from 'styled-components';
import { getStyledThemProperty } from '@/shared/styles/util';
import { UserImage } from '@/shared/component/Atom';
import useModalState from '@/shared/hooks/useModalState';

type ManageSubscriber = {
  channelName: string;
};

const ModalManageSubscriber = ({ closeModal }: ModalProps) => {
  const {
    isShow,
    handleIsShow: modalClose,
    handleOnAnimationEnd,
  } = useAnimationHandler(() => closeModal('ManageSubscriber'));

  const ref = useOuterClick<HTMLDivElement>({ callback: modalClose });

  const tabs = ['구독자 99+', '멤버 99+'];

  const { channelId, name = '' } = useModalState('ManageSubscriber');

  const [test, setTest] = useState(true);

  const handleAuth = () => {};

  return (
    <Modal ref={ref} isShow={isShow} onAnimationEnd={handleOnAnimationEnd}>
      <S.Title>{name}</S.Title>
      <S.TabBox>
        <S.Tap isActive={test} onClick={() => setTest(!test)}>
          구독자 99+
        </S.Tap>
        <S.Tap>멤버 99+</S.Tap>
      </S.TabBox>
      <S.Description>
        구독자에게 편집 권한을 설정하거나 해제할 수 있습니다.
      </S.Description>
      <Modal.Input placeholder="이름을 입력하세요." />
      <S.UserList>
        <S.UserItem>
          <UserImage src="" width={57} height={57} />
          <div>
            <S.Name>이름</S.Name>
            <S.Email>이메일</S.Email>
          </div>
          <Modal.Button variant={test ? 'accent' : 'primary'}>
            설정
          </Modal.Button>
        </S.UserItem>
      </S.UserList>
      <Modal.Dim />
    </Modal>
  );
};

export default memo(ModalManageSubscriber);

const Header = styled.div`
  width: 488px;
`;

const Title = styled.div`
  color: ${getStyledThemProperty('colors', 'Black')};
  ${getStyledThemProperty('fonts', 'body2')};
`;

const TabBox = styled.ul`
  margin-top: 14px;
  border-bottom: 1px solid #d9d9d9;
`;

const Tap = styled.button<{ isActive?: boolean }>`
  box-sizing: border-box;
  color: ${getStyledThemProperty('colors', 'G_700')};
  ${getStyledThemProperty('fonts', 'caption1')};
  border: none;
  border-bottom: 2px solid ${getStyledThemProperty('colors', 'White')};
  background-color: ${getStyledThemProperty('colors', 'White')};
  padding: 4px 8px;

  ${({ isActive }) =>
    isActive &&
    css`
      color: ${getStyledThemProperty('colors', 'Black')};
      border-bottom: 2px solid ${getStyledThemProperty('colors', 'main')};
    `}
`;

const Description = styled.div`
  color: ${getStyledThemProperty('colors', 'G_700')};
  ${getStyledThemProperty('fonts', 'caption2')};

  margin-top: 22px;
`;

const UserList = styled.ul`
  margin-top: 30px;
`;

const UserItem = styled.li`
  display: grid;
  grid-template-columns: 57px 1fr 90px;
  align-items: center;
  grid-column-gap: 21px;
`;

const Name = styled.div`
  color: ${getStyledThemProperty('colors', 'Black')};
  ${getStyledThemProperty('fonts', 'caption1')};
  line-height: 200%;
`;

const Email = styled.div`
  color: ${getStyledThemProperty('colors', 'G_700')};
  ${getStyledThemProperty('fonts', 'caption3')};
  line-height: 200%;
`;

const S = {
  Header,
  Title,
  TabBox,
  Tap,
  Description,
  UserList,
  UserItem,
  Name,
  Email,
};
