import { pixelToRemUnit } from '@/shared/styles/util';
import styled, { css } from 'styled-components';

interface Props {
  channels: {
    id: number;
    title: string;
    created: string;
    isSubscribed: boolean;
  }[];
}

const ChannelList = ({ channels }: Props) => {
  return (
    <div>
      <Wrap>
        <Head>
          <span>제목</span>
          <span>개설자</span>
          <span>구독</span>
        </Head>
        <Ul>
          {channels?.map((channel) => (
            <Li key={channel.id}>
              <Span>{channel.title}</Span>
              <Span>{channel.created}</Span>
              <Span>{channel.isSubscribed ? '구독중' : '구독'}</Span>
            </Li>
          ))}
        </Ul>
      </Wrap>
    </div>
  );
};

export default ChannelList;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: ${pixelToRemUnit(467)};
  height: 100%;

  border-right: 1px solid #dbdbdb;
  background-color: #fff;
  position: absolute;
`;

const Head = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 415px;
  min-height: 80px;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 1 0;

    ${({ theme }) =>
      css`
        ${theme.fonts.caption1};
      `};
  }
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;

  overflow-y: scroll;
`;

const Li = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid #dbdbdb;
  border-radius: 11px;

  width: 415px;
  min-height: 80px;

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

  ${({ theme }) =>
    css`
      ${theme.fonts.caption2};
    `};
`;
