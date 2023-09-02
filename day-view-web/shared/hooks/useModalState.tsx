import { useRecoilValue } from 'recoil';
import { ModalType } from '@/component/modal/ModalRenderer';
import { modalState } from '../../state/modalState';

const useModalState = (modalType: ModalType) => {
  const { params } = useRecoilValue(modalState(modalType));

  if (!params) return {};

  return { ...params };
};

export default useModalState;
