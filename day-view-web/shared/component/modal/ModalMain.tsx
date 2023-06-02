import { Children, ReactNode, isValidElement } from 'react';
import styled, { keyframes } from 'styled-components';
import { pixelToRemUnit } from '@/shared/styles/util';

interface Props {
  children?: ReactNode;
}

const ModalMain = ({ children }: Props) => {
  const childrenArray = Children.toArray(children);

  const { filteredChildren, selectedComponents } = childrenArray.reduce(
    (result, child) => {
      if (
        isValidElement(child) &&
        typeof child.type === 'function' &&
        child.type.name === 'ModalDim'
      ) {
        result.selectedComponents.push(child);
      } else {
        result.filteredChildren.push(child);
      }
      return result;
    },
    {
      filteredChildren: [] as ReactNode[],
      selectedComponents: [] as ReactNode[],
    }
  );

  return (
    <S.Layout>
      <S.Container>{filteredChildren}</S.Container>
      {selectedComponents}
    </S.Layout>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

const S = {
  Layout: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
  `,

  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
    position: relative;

    padding: ${pixelToRemUnit([60, 50])};

    background-color: ${({ theme }) => theme.colors.White};
    border-radius: 11px;
    z-index: 200;

    animation: ${fadeIn} 0.3s ease forwards;
  `,
};

export default ModalMain;
