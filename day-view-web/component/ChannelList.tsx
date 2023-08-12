import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';
import styled, { css } from 'styled-components';

interface Props {
  channels: {
    id: number;
    title: string;
    created: string;
    subscriber: string;
    date: string;
    isSubscribed: boolean;
  }[];
}

const ChannelList = ({ channels }: Props) => {
  return (
    <Wrap>
      <Head>
        <Span>제목</Span>
        <Span>개설자</Span>
        <Span>구독자 수</Span>
        <Span>개설일</Span>
        <Span>구독</Span>
      </Head>
      <Ul>
        {channels?.map((channel) => (
          <Li key={channel.id}>
            <Span>{channel.title}</Span>
            <Span>{channel.created}</Span>
            <Span>{channel.subscriber}</Span>
            <Span>{channel.date}</Span>
            <Span>{channel.isSubscribed ? '구독중' : '구독'}</Span>
          </Li>
        ))}
      </Ul>
    </Wrap>
  );
};

export default ChannelList;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${pixelToRemUnit([20, 80])};

  height: 100%;
`;

const Ul = styled.ul`
  display: inline-flex;
  flex-direction: column;
  gap: 20px;

  //overflow-y: overlay;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Li = styled.li`
  display: flex;
  align-items: center;

  border: 1px solid ${getStyledThemProperty('colors', 'G_300')};
  border-radius: 11px;

  min-height: ${pixelToRemUnit(100)};

  &:hover {
    ${({ theme }) => css`
      border: 1px solid ${theme.colors.main};
      color: ${theme.colors.main};
    `}
  }
`;

const Span = styled.span`
  display: flex;
  justify-content: center;
  flex: 1 1 0;

  ${getStyledThemProperty('fonts', 'body3')}
`;

const Head = styled.div`
  display: flex;
  align-items: center;

  min-height: ${pixelToRemUnit(88)};

  ${Span} {
    ${getStyledThemProperty('fonts', 'body2')}
  }
`;
