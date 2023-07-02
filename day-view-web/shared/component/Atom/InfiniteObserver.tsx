import { memo, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Spinner from '@/shared/component/Atom/Spinner';
import styled, { css } from 'styled-components';

interface Props {
  status: 'idle' | 'error' | 'loading' | 'success';
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

const InfiniteObserver = ({
  status,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: Props) => {
  // TODO 추후 라이브러리 제거
  const [inViewRef, inView] = useInView({
    threshold: 0.01,
  });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [hasNextPage, inView]);

  if (status !== 'success' || !hasNextPage) return null;

  return !isFetchingNextPage ? (
    <RefWrapper ref={inViewRef}></RefWrapper>
  ) : (
    <SpinnerWrapper>
      <Spinner width={40} height={40} />
    </SpinnerWrapper>
  );
};
export default memo(InfiniteObserver);

const RefWrapper = styled.div`
  width: 100%;
  height: 10px;
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
