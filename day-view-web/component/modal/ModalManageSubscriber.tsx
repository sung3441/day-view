import { memo, useState } from 'react';
import styled, { css } from 'styled-components';
import Modal from '@/shared/component/Organism/Modal';
import { ModalProps } from './ModalRenderer';
import { useAnimationHandler, useOuterClick } from '@/shared/hooks';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';

import useModalState from '@/shared/hooks/useModalState';
import { SearchBar } from '@/shared/component/Molecule';
import { UserImage } from '@/shared/component/Atom';
import useGetSubscribers from '@/shared/context/subscribe/hooks/useGetSubscribers';
import usePatchSubscribeInfo from '@/shared/context/subscribe/hooks/usePatchSubscribeInfo';
import { PatchSubscribeInfoParamType } from '@/shared/types/api';

const ModalManageSubscriber = ({ closeModal }: ModalProps) => {
  const {
    isShow,
    handleIsShow: modalClose,
    handleOnAnimationEnd,
  } = useAnimationHandler(() => closeModal('ManageSubscriber'));

  const { channelId = -1, name = '' } = useModalState('ManageSubscriber');
  const { data: members, status } = useGetSubscribers(channelId as number);

  const { mutate } = usePatchSubscribeInfo(channelId);

  const ref = useOuterClick<HTMLDivElement>({ callback: modalClose });

  const handleSubscribeInfo = (param: PatchSubscribeInfoParamType) => {
    console.log(param);
    // mutate({ subscribeId: param.subscribeId, auth: 'MANAGE' });
  };

  // TODO : 권한이 있는 경우만 설정 가능하게
  // TODO : 권한 없는 경우 error 처리
  const checkAuth = (
    type: Pick<PatchSubscribeInfoParamType, 'auth'>['auth']
  ) => {
    return true;
  };

  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <Modal ref={ref} isShow={isShow} onAnimationEnd={handleOnAnimationEnd}>
      <S.Title>{name}</S.Title>
      <S.TabBox>
        <S.Tap isActive={true}>{`구독자 ${members?.count}`}</S.Tap>
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
        <S.UserList>
          {members?.subscribers?.map((member) => {
            const isManage = member.auth === 'MANAGE';
            return (
              <S.UserItem key={member.email}>
                <UserImage
                  src={member.profileImageUrl}
                  width={57}
                  height={57}
                />
                <div>
                  <S.Name>{member.name}</S.Name>
                  <S.Email>{member.email}</S.Email>
                </div>
                <Modal.Button
                  variant={isManage ? 'accent' : 'primary'}
                  font={isManage ? 'caption1' : 'caption2'}
                  onClick={() => {
                    checkAuth(member.auth) &&
                      handleSubscribeInfo({
                        subscribeId: member.subscribeId,
                        auth: member.auth,
                      });
                  }}
                >
                  {isManage ? '설정' : '해제'}
                </Modal.Button>
              </S.UserItem>
            );
          })}
        </S.UserList>
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
  Title,
  TabBox,
  Tap,
  Description,
  UserList,
  UserItem,
  Name,
  Email,
};
