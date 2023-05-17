import ModalControl from './ModalControl';
import ModalInput from './ModalInput';
import ModalMain from './ModalMain';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';

import { ToggleButton, Textarea } from '@/shared/component/Atom/';

const Modal = Object.assign(ModalMain, {
  Input: ModalInput,
  Control: ModalControl,
  Header: ModalHeader,
  Body: ModalBody,
  ToggleButton,
  Textarea,
});

export default Modal;
