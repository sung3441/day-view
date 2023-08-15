import { memo, useState } from 'react';
import styled, { css } from 'styled-components';
import Modal from '../../shared/component/Organism/Modal';
import { ModalProps } from './ModalRenderer';
import { useAnimationHandler, useOuterClick } from '@/shared/hooks';
import { getStyledThemProperty } from '@/shared/styles/util';

import useModalState from '@/shared/hooks/useModalState';
import { SearchBar } from '@/shared/component/Molecule';

// ! TEST
import { SubscribeMembersRes } from '@/shared/types/api';
const members = {
  data: {
    count: 2,
    subscribers: [
      {
        name: '김시온',
        email: 'st@gmail.com',
        auth: 'MANAGE',
        profileImageUrl: '',
      },
      {
        name: '김싱온',
        email: 'tldhs@gmail.com',
        auth: 'MANAGE',
        profileImageUrl: '',
      },
      {
        name: '김시온',
        email: 'st@gmail.com',
        auth: 'MANAGE',
        profileImageUrl: '',
      },
      {
        name: '김싱온',
        email: 'tldhs@gmail.com',
        auth: 'MANAGE',
        profileImageUrl: '',
      },
      {
        name: '김시온',
        email: 'st@gmail.com',
        auth: 'MANAGE',
        profileImageUrl: '',
      },
      {
        name: '김싱온',
        email: 'tldhs@gmail.com',
        auth: 'MANAGE',
        profileImageUrl: '',
      },
    ],
  },
} as SubscribeMembersRes;

const ModalManageSubscriber = ({ closeModal }: ModalProps) => {
  const {
    isShow,
    handleIsShow: modalClose,
    handleOnAnimationEnd,
  } = useAnimationHandler(() => closeModal('ManageSubscriber'));

  const { channelId, name = '' } = useModalState('ManageSubscriber');
  const ref = useOuterClick<HTMLDivElement>({ callback: modalClose });
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <Modal ref={ref} isShow={isShow} onAnimationEnd={handleOnAnimationEnd}>
      <S.Title>{name}</S.Title>
      <S.TabBox>
        <S.Tap>구독자 99+</S.Tap>
        <S.Tap>멤버 99+</S.Tap>
      </S.TabBox>
      <S.Description>
        구독자에게 편집 권한을 설정하거나 해제할 수 있습니다.
      </S.Description>
      <SearchBar
        value={searchValue}
        setValue={setSearchValue}
        placeholder="이름을 입력하세요."
      />
      <UserListWrapper>
        <Modal.UserList members={members} />
      </UserListWrapper>
      <Modal.Dim />
    </Modal>
  );
};

export default memo(ModalManageSubscriber);

const UserListWrapper = styled.div`
  margin-top: 30px;
`;

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
  margin-bottom: 12px;
`;

const S = {
  Header,
  Title,
  TabBox,
  Tap,
  Description,
};
