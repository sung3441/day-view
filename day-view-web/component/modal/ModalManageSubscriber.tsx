import { memo, useState } from 'react';
import styled, { css } from 'styled-components';
import Modal from '../../shared/component/Organism/Modal';
import { ModalProps } from './ModalRenderer';
import { useAnimationHandler, useOuterClick } from '@/shared/hooks';
import { getStyledThemProperty } from '@/shared/styles/util';

import useModalState from '@/shared/hooks/useModalState';
import { SearchBar } from '@/shared/component/Molecule';
import useGetSubscribers from './hooks/useGetSubscribers';

const ModalManageSubscriber = ({ closeModal }: ModalProps) => {
  const {
    isShow,
    handleIsShow: modalClose,
    handleOnAnimationEnd,
  } = useAnimationHandler(() => closeModal('ManageSubscriber'));

  const { channelId, name = '' } = useModalState('ManageSubscriber');
  const ref = useOuterClick<HTMLDivElement>({ callback: modalClose });

  const { data, status } = useGetSubscribers(channelId as number);

  const [searchValue, setSearchValue] = useState<string>('');

  // TODO UserList subscribers만 넘기기
  return (
    <Modal ref={ref} isShow={isShow} onAnimationEnd={handleOnAnimationEnd}>
      <S.Title>{name}</S.Title>
      <S.TabBox>
        <S.Tap>{`구독자 ${data?.data.count}`}</S.Tap>
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
        <Modal.UserList members={data?.data} />
      </UserListWrapper>
      <Modal.Dim />
    </Modal>
  );
};

export default memo(ModalManageSubscriber);

const UserListWrapper = styled.div`
  margin-top: 30px;
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
  Title,
  TabBox,
  Tap,
  Description,
};
