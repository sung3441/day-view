import { useSetRecoilState } from 'recoil';
import { modalState } from '@/shared/atom/modalState';
import { ModalType } from '@/component/modal/ModalRenderer';

/**
 * TODO: Refactor
 */
const useModal = () => {
  const setType = useSetRecoilState(modalState);
  const openModal = (type: ModalType) => {
    setType(type);
  };
  const closeModal = () => {
    setType('');
  };

  return { openModal, closeModal };
};

export default useModal;
