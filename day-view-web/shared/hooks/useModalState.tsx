import { useRecoilValue } from 'recoil';
import { ModalType } from '@/component/modal/ModalRenderer';
import { modalState } from '../atom/modalState';

const useModalState = (modalType: ModalType) => {
  const { params } = useRecoilValue(modalState(modalType));

  return { ...params };
};

export default useModalState;
