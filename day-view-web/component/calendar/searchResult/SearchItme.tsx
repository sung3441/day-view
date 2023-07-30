import styled, { css } from 'styled-components';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';
import { memo } from 'react';
import { SearchItemType } from '@/shared/types/api';
import {
  useSubscribeChannel,
  useUnsubscribeChannel,
} from '@/shared/context/channel/hooks/usePostChannel';

const coverToComma = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

interface Props extends SearchItemType {}
const SearchItem = ({
  name,
  createdDate,
  subscriberCount,
  subscribe,
  creatorNickname,
  id,
  creatorId,
  channelType,
}: Props) => {
  const { mutate: subscribeChannel } = useSubscribeChannel();
  const { mutate: unsubscribeChannel } = useUnsubscribeChannel();
  const handelSubscribe = () => {
    if (subscribe) unsubscribeChannel(id);
    else subscribeChannel(id);
  };

  return (
    <ItemBox>
      <Item>{name}</Item>
      <Item>{creatorNickname}</Item>
      <Item>{coverToComma(subscriberCount)} 명</Item>
      <Item>{createdDate.slice(0, 10)}</Item>
      <Item>
        <SubscribeButton isSubscribe={subscribe} onClick={handelSubscribe}>
          {subscribe ? '구독중' : '구독'}
        </SubscribeButton>
      </Item>
    </ItemBox>
  );
};

export default memo(SearchItem);

const ItemBox = styled.div`
  width: 100%;
  height: 100px;

  display: flex;
  align-items: center;
  justify-content: space-evenly;

  border: 1px solid ${getStyledThemProperty('colors', 'G_300')};
  border-radius: 7px;

  & + & {
    margin-top: 20px;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 20%;
  ${getStyledThemProperty('fonts', 'body3')};
`;

const SubscribeButton = styled.button<{ isSubscribe: boolean }>`
  width: ${pixelToRemUnit(80)};
  height: 40px;
  ${getStyledThemProperty('fonts', 'body3')};
  border: none;
  border-radius: 7px;

  ${({ isSubscribe }) =>
    isSubscribe
      ? css`
          background-color: ${getStyledThemProperty('colors', 'main')};
          color: ${getStyledThemProperty('colors', 'White')};
        `
      : css`
          background-color: ${getStyledThemProperty('colors', 'G_200')};
          color: ${getStyledThemProperty('colors', 'G_500')};
        `};
`;
