import ModalControl from './ModalControl';
import ModalInput from './ModalInput';
import ModalMain from './ModalMain';
import Textarea from '../Atom/Textarea';
import ModalTitle from './ModalTitle';
import ToggleButton from '../Atom/ToggleButton';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';

const Modal = Object.assign(ModalMain, {
  Title: ModalTitle,
  Input: ModalInput,
  ToggleButton: ToggleButton,
  Textarea: Textarea,
  Control: ModalControl,
  Header: ModalHeader,
  Body: ModalBody,
});

export default Modal;
