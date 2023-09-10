import { memo, SyntheticEvent, useMemo } from 'react';
import { Icon } from '@/shared/component/Atom';
import styled from 'styled-components';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';
import { ChannelRes, ChannelSelectType } from '@/shared/types/api';
import { useModal } from '@/shared/hooks';
import { useUnsubscribeChannel } from '@/shared/context/channel/hooks/usePostChannel';

interface Props extends Pick<ChannelRes, 'subscribeAuth' | 'channelType'> {
  channelId: number;
  subscribeId: number;
  selectType: ChannelSelectType;
  name: string;
  handleIsShow(): void;
}

const ChannelConfigs = ({
  channelId,
  subscribeId,
  subscribeAuth,
  channelType,
  selectType,
  name,
  handleIsShow,
}: Props) => {
  const { mutate: unsubscribeChannel } = useUnsubscribeChannel();
  const { openModal } = useModal();

  const openManageChannelModal = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleIsShow();
    openModal('ManageChannel', { channelId: channelId, name: name });
  };

  const openManageSubscriberModal = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleIsShow();
    openModal('ManageSubscriber', {
      channelId: channelId,
      name: name,
      subscribeAuth,
      channelType,
    });
  };

  const handleUnsubscribeChannel = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleIsShow();
    unsubscribeChannel(channelId);
  };

  const configs = useMemo(() => {
    if (selectType === 'MANAGE') {
      return (
        <>
          <ConfigButton onClick={(e) => openManageChannelModal(e)}>
            <Icon type="sm_config" />
            <span>관리</span>
          </ConfigButton>
          <ConfigButton onClick={(e) => openManageSubscriberModal(e)}>
            <Icon type="sm_user" />
            <span>구독자 관리</span>
          </ConfigButton>
        </>
      );
    }
    return (
      <ConfigButton onClick={(e) => handleUnsubscribeChannel(e)}>
        <Icon type="sm_config" />
        <span>구독해제</span>
      </ConfigButton>
    );
  }, [selectType]);

  return <>{configs}</>;
};

export default memo(ChannelConfigs);

const ConfigButton = styled.button`
  width: 100%;
  border: none;
  border-bottom: 1px solid #d9d9d9;
  padding: 5px;
  display: flex;
  align-items: center;
  background-color: ${getStyledThemProperty('colors', 'White')};

  > span {
    margin-left: ${pixelToRemUnit(7)};
    ${getStyledThemProperty('fonts', 'caption3')};
  }
`;
