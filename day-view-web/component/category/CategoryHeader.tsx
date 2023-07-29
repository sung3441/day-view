import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';
import styled from 'styled-components';
import CategoryButton from './CategoryHeaderButton';
import { ChannelRes } from '@/shared/types/api';
import {
  MouseEventHandler,
  SyntheticEvent,
  useCallback,
  useRef,
  useState,
} from 'react';

interface Props {
  categories: ChannelRes[];
}

const moveCenterFromParent = (parent: HTMLElement, target: HTMLElement) => {
  const parentHalfWidth = parent.clientWidth / 2;
  // 부모로 부터 위치
  const offsetX = target.offsetLeft;
  const targetCenter = target.clientWidth / 2;
  parent.scrollTo({
    top: 0,
    left: offsetX - parentHalfWidth + targetCenter,
    behavior: 'smooth',
  });
};

// '카테고리' 탭 누르면 실행
const CategoryHeader = ({ categories }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [selectedChannelId, setSelectedChannelId] = useState<number>(0);
  const toggleHandler = useCallback(
    (e: SyntheticEvent<HTMLButtonElement>, channelId: number) => {
      setSelectedChannelId(channelId);
      if (!wrapperRef.current) return;
      moveCenterFromParent(wrapperRef.current, e.currentTarget);
    },
    []
  );

  return (
    <Wrapper ref={wrapperRef}>
      {categories?.map((channel) => (
        <CategoryButton
          key={channel.channelId}
          isSelected={channel.channelId === selectedChannelId}
          name={channel.name}
          id={channel.channelId}
          toggleHandler={toggleHandler}
        />
      ))}
    </Wrapper>
  );
};

export default CategoryHeader;

const Wrapper = styled.div`
  ${getStyledThemProperty('layout', 'pageHeader')}
  padding: 0 ${pixelToRemUnit(20)};
  display: flex;
  align-items: center;
  overflow: auto;
  gap: 0 10px;

  ::-webkit-scrollbar {
    display: none;
  }
`;
