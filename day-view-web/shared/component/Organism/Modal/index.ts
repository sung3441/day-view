import ModalMain from './ModalMain';
import ModalDim from './ModalDim';
import ModalInput from './ModalInput';
import ModalUserList from './ModalUserList';
import * as S from './modalStyle';

import { ToggleButton, Textarea, Button } from '@/shared/component/Atom';

const Modal = Object.assign(ModalMain, {
  Input: ModalInput,
  Dim: ModalDim,
  UserList: ModalUserList,
  ToggleButton,
  Textarea,
  Button,
  ...S,
});

export default Modal;
