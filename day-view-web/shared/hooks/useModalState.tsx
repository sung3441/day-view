import { useRecoilValue } from 'recoil';
import { ModalType } from '@/component/modal/ModalRenderer';
import { modalState } from '../../state/modalState';

const useModalState = (modalType: ModalType) => {
  const { params } = useRecoilValue(modalState(modalType));

  return { ...params };
};

export default useModalState;
