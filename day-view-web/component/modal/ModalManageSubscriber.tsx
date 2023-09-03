import { memo, useState } from 'react';
import styled, { css } from 'styled-components';
import Modal from '../../shared/component/Organism/Modal';
import { ModalProps } from './ModalRenderer';
import { useAnimationHandler, useOuterClick } from '@/shared/hooks';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';

import useModalState from '@/shared/hooks/useModalState';
import { SearchBar } from '@/shared/component/Molecule';
import useGetSubscribers from '../../shared/context/user/hooks/useGetSubscribers';

const ModalManageSubscriber = ({ closeModal }: ModalProps) => {
  const {
    isShow,
    handleIsShow: modalClose,
    handleOnAnimationEnd,
  } = useAnimationHandler(() => closeModal('ManageSubscriber'));

  const { channelId, name = '' } = useModalState('ManageSubscriber');
  const { data, status } = useGetSubscribers(channelId as number);

  const ref = useOuterClick<HTMLDivElement>({ callback: modalClose });

  const [searchValue, setSearchValue] = useState<string>('');

  // TODO UserList subscribers만 넘기기
  return (
    <Modal ref={ref} isShow={isShow} onAnimationEnd={handleOnAnimationEnd}>
      <S.Title>{name}</S.Title>
      <S.TabBox>
        <S.Tap>{`구독자 ${data?.count}`}</S.Tap>
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
        <Modal.UserList members={data?.subscribers} />
      </UserListWrapper>
      <Modal.Dim />
    </Modal>
  );
};

export default memo(ModalManageSubscriber);

const UserListWrapper = styled.div`
  margin-top: ${pixelToRemUnit(30)};
`;

const Title = styled.div`
  color: ${getStyledThemProperty('colors', 'Black')};
  ${getStyledThemProperty('fonts', 'body2')};
`;

const TabBox = styled.ul`
  margin-top: ${pixelToRemUnit(14)};
  border-bottom: 1px solid #d9d9d9;
`;

const Tap = styled.button<{ isActive?: boolean }>`
  box-sizing: border-box;
  color: ${getStyledThemProperty('colors', 'G_700')};
  ${getStyledThemProperty('fonts', 'caption1')};
  border: none;
  border-bottom: 2px solid ${getStyledThemProperty('colors', 'White')};
  background-color: ${getStyledThemProperty('colors', 'White')};
  padding: ${pixelToRemUnit([4, 8])};

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

  margin-top: ${pixelToRemUnit(22)};
  margin-bottom: ${pixelToRemUnit(12)};
`;

const S = {
  Title,
  TabBox,
  Tap,
  Description,
};
