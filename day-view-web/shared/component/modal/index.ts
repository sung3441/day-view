import ModalInput from './ModalInput';
import ModalMain from './ModalMain';
import ModalTitle from './ModalTitle';

const Modal = Object.assign(ModalMain, {
  Title: ModalTitle,
  Input: ModalInput,
});

export default Modal;
