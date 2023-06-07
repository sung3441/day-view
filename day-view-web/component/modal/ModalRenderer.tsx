import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRecoilValue } from 'recoil';

import { modalListAtom } from '@/shared/atom/modalState';
import {
  ModalCreateChannel,
  ModalManageChannel,
  ModalEditorList,
  ModalAddSchedule,
} from '@/component/modal';

const modalComponents = {
  CreateCategory: ModalCreateChannel,
  ManageCategory: ModalManageChannel,
  EditorList: ModalEditorList,
  AddSchedule: ModalAddSchedule,
} satisfies Record<string, React.MemoExoticComponent<() => React.ReactElement>>;

export type ModalType = keyof typeof modalComponents;

/**
 * TODO: props 받고, 모달 닫는 애니메이션 적용할 수 있도록 recoilState, useModal 리팩토링
 * TODO: 클릭 지점에 모달 위치시키기
 * TODO: Dim 클릭 시 모달 닫기
 */
const ModalRenderer = () => {
  const modalList = useRecoilValue(modalListAtom);

  const ref = useRef<Element | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    ref.current = document.querySelector<HTMLElement>('#portal');
  }, []);

  if (modalList.length === 0) return null;

  return isMounted && ref.current
    ? createPortal(
        modalList.map((modalType) => {
          const ModalComponent = modalComponents[modalType];

          return <ModalComponent key={modalType} />;
        }),
        ref.current!
      )
    : null;
};

export default ModalRenderer;
