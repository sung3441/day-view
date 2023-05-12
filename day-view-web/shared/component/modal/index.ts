import ModalControl from './ModalControl';
import ModalInput from './ModalInput';
import ModalMain from './ModalMain';
import ModalTextarea from './ModalTextarea';
import ModalTitle from './ModalTitle';
import ModalToggleButton from './ModalToggleButton';

const Modal = Object.assign(ModalMain, {
  Title: ModalTitle,
  Input: ModalInput,
  ToggleButton: ModalToggleButton,
  Textarea: ModalTextarea,
  Control: ModalControl,
});

export default Modal;
