import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRecoilValue } from 'recoil';

import { modalState } from '@/shared/atom/modalState';
import ModalCreateChannel from './ModalCreateChannel';
import ModalManageChannel from './ModalManageChannel';

const ModalComponents = {
  Create: ModalCreateChannel,
  Manage: ModalManageChannel,
} satisfies Record<string, () => React.ReactElement>;

export type ModalType = keyof typeof ModalComponents | '';

const ModalRenderer = () => {
  const modalType = useRecoilValue(modalState);

  const ref = useRef<Element | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    ref.current = document.querySelector<HTMLElement>('#portal');
  }, []);

  if (!modalType) return null;

  const ModalComponent = ModalComponents[modalType];
  return isMounted && ref.current
    ? createPortal(<ModalComponent />, ref.current!)
    : null;
};

export default ModalRenderer;
