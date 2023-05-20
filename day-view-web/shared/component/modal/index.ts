import styled from 'styled-components';

import ModalControl from './ModalControl';
import ModalInput from './ModalInput';
import ModalMain from './ModalMain';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';

import { ToggleButton, Textarea, Button } from '@/shared/component/Atom/';
import UserList from '@/component/modal/UserList';

const SubTitle = styled.div`
  ${({ theme }) => theme.fonts.caption2};
  color: ${({ theme }) => theme.colors.G_700};
`;

const Modal = Object.assign(ModalMain, {
  Input: ModalInput,
  Control: ModalControl,
  Header: ModalHeader,
  Body: ModalBody,
  SubTitle,
  ToggleButton,
  Textarea,
  UserList,
  Button,
});

export default Modal;
