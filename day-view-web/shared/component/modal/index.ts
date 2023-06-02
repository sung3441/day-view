import styled from 'styled-components';

import ModalControl from './ModalControl';
import ModalInput from './ModalInput';
import ModalMain from './ModalMain';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalDim from './ModalDim';

import { ToggleButton, Textarea, Button } from '@/shared/component/Atom/';
import UserList from '@/component/modal/UserList';

const Title = styled.h2`
  ${({ theme }) => theme.fonts.title2};
  color: ${({ theme }) => theme.colors.Black};
`;

const SubTitle = styled.div`
  ${({ theme }) => theme.fonts.caption2};
  color: ${({ theme }) => theme.colors.G_700};
`;

const Divider = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 2px;
  left: 50%;
  background: #dbdbdb;
`;

const Modal = Object.assign(ModalMain, {
  Input: ModalInput,
  Control: ModalControl,
  Header: ModalHeader,
  Body: ModalBody,
  Dim: ModalDim,
  Title,
  SubTitle,
  ToggleButton,
  Textarea,
  UserList,
  Button,
  Divider,
});

export default Modal;
