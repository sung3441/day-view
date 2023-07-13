import { useState, SyntheticEvent, memo } from 'react';
import styled from 'styled-components';

import { VALIDATION_LENGTH } from '@/constants/validate';
import { useAnimationHandler } from '@/shared/hooks';
import { pixelToRemUnit } from '@/shared/styles/util';
import { useCreateChannel } from '../calendar/hooks/usePostChannel';
import { ModalProps } from './ModalRenderer';
import useValidation from '@/shared/hooks/useValidation';
import Modal from '@/shared/component/Organism/MODAL';

type CreateChannel = {
  categoryName: string;
  isPrivate: boolean;
};

const ModalManageChannel = ({ closeModal }: ModalProps) => {
  const {
    isShow,
    handleIsShow: modalClose,
    handleOnAnimationEnd,
  } = useAnimationHandler(() => closeModal('ManageChannel'));

  const [value, setValue] = useState<CreateChannel>({
    categoryName: '',
    isPrivate: false,
  });

  const { isValid, validate } = useValidation('channelNameLength');

  const { mutate, status } = useCreateChannel();

  const handleChangeValue = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const { name, value, checked } = target;

    switch (name) {
      case 'categoryName':
        validate(value);
        setValue((prev) => ({ ...prev, categoryName: value }));
        break;
      case 'toggle':
        setValue((prev) => ({ ...prev, isPrivate: checked }));
        break;
    }
  };

  const handleCreateChannel = () => {
    mutate({ name: value.categoryName, secretYn: value.isPrivate });
    modalClose();
  };

  return (
    <Modal isShow={isShow} onAnimationEnd={handleOnAnimationEnd}>
      <Modal.Header>
        <Modal.Title>채널 수정</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Modal.Section>
          <Modal.SubTitle>채널 이름</Modal.SubTitle>
          <Modal.Wrapper>
            <Modal.Input
              type="text"
              name="categoryName"
              value={value.categoryName}
              onChange={handleChangeValue}
              placeholder="이름을 입력하세요."
              isValid={isValid}
            />
            {!isValid && (
              <Modal.Validation>{`${VALIDATION_LENGTH.MIN_LENGTH}자 ~ ${VALIDATION_LENGTH.CHANNEL_MAX_LENGTH}자로 입력해주세요.`}</Modal.Validation>
            )}
          </Modal.Wrapper>
        </Modal.Section>
        <Modal.Section>
          <Modal.SubTitle>비공개</Modal.SubTitle>
          <WrapButton>
            <Modal.ToggleButton
              id="toggle"
              name="toggle"
              checked
              onChange={handleChangeValue}
            />
          </WrapButton>
        </Modal.Section>
      </Modal.Body>
      <Modal.Control>
        <Modal.Button variant="primary" onClick={modalClose}>
          취소
        </Modal.Button>
        <Modal.Button
          variant="accent"
          onClick={handleCreateChannel}
          disabled={!isValid}
        >
          완료
        </Modal.Button>
      </Modal.Control>
      <Modal.Dim />
    </Modal>
  );
};

export default memo(ModalManageChannel);

const WrapButton = styled.div`
  width: ${pixelToRemUnit(380)};
`;
