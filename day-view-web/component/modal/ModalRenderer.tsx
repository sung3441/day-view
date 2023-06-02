import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRecoilValue } from 'recoil';

import { modalListAtom } from '@/shared/atom/modalState';
import {
  ModalCreateChannel,
  ModalManageChannel,
  ModalEditorList,
} from '@/component/modal';

const modalComponents = {
  CreateCategory: ModalCreateChannel,
  ManageCategory: ModalManageChannel,
  EditorList: ModalEditorList,
} satisfies Record<string, React.MemoExoticComponent<() => React.ReactElement>>;

export type ModalType = keyof typeof modalComponents;

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
