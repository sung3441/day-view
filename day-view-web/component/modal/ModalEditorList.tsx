import { memo } from 'react';
import styled from 'styled-components';
import Modal from '@/shared/component/modal';
import { getStyledThemProperty } from '@/shared/styles/util';
import { Button, UserImage } from '@/shared/component/Atom';

interface Props {
  type: 'EditorList' | 'SubscriberList';
}

const ModalEditorList = ({ type = 'EditorList' }: Props) => {
  const modalConfig = {
    EditorList: {
      title: '편집자 목록',
      description: '편집 권한을 해제할 수 있습니다.',
      buttonLabel: '해제',
    },
    SubscriberList: {
      title: '구독자 목록',
      description: '편집 권한을 설정할 수 있습니다.',
      buttonLabel: '설정',
    },
  };

  const { title, description, buttonLabel } = modalConfig[type];

  return (
    <Modal>
      <Modal.Header
        style={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 4,
        }}
      >
        <Modal.Title>{title}</Modal.Title>
        <S.Description>{description}</S.Description>
      </Modal.Header>
      <Modal.Body>
        <>
          <UserImage src="" />
          <div>name</div>
          <div>email</div>
          <Button variant="accent">{buttonLabel}</Button>
        </>
      </Modal.Body>
      <Modal.Dim />
    </Modal>
  );
};

export default memo(ModalEditorList);

const Description = styled.div`
  ${getStyledThemProperty('fonts', 'caption3')};
  color: ${getStyledThemProperty('colors', 'G_700')};
`;

const S = {
  Description,
};
