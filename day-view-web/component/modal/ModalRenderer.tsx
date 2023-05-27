import { modalState } from '@/shared/atom/modalState';
import { useRecoilValue } from 'recoil';
import ModalCreateChannel from './ModalCreateChannel';
import ModalManageChannel from './ModalManageChannel';

const ModalComponents = {
  Create: ModalCreateChannel,
  Manage: ModalManageChannel,
} satisfies Record<string, () => React.ReactElement>;

export type ModalType = keyof typeof ModalComponents | '';

const ModalRenderer = () => {
  const modalType = useRecoilValue(modalState);
  if (!modalType) return null;

  const ModalComponent = ModalComponents[modalType];
  return <ModalComponent />;
};

export default ModalRenderer;
