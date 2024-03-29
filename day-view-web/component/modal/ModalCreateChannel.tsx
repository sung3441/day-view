import { memo, SyntheticEvent, useState } from 'react';
import Modal from '../../shared/component/Organism/Modal';
import { ModalProps } from '@/component/modal/ModalRenderer';
import { useAnimationHandler } from '@/shared/hooks';
import { useCreateChannel } from '@/shared/context/channel/hooks/usePostChannel';
import useValidation from '@/shared/hooks/useValidation';

type CreateChannel = {
  categoryName: string;
  isPrivate: boolean;
};

const ModalCreateChannel = ({ closeModal }: ModalProps) => {
  const {
    isShow,
    handleIsShow: modalClose,
    handleOnAnimationEnd,
  } = useAnimationHandler(() => closeModal('CreateChannel'));

  const [value, setValue] = useState<CreateChannel>({
    categoryName: '',
    isPrivate: false,
  });

  const { isValid, InvalidMessage, validate } =
    useValidation('channelNameLength');

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
        <Modal.Title>새 채널 만들기</Modal.Title>
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
              <Modal.InvalidText>{InvalidMessage}</Modal.InvalidText>
            )}
          </Modal.Wrapper>
        </Modal.Section>
        <Modal.Section>
          <Modal.SubTitle>비공개</Modal.SubTitle>
          <Modal.ToggleButton
            id="toggle"
            name="toggle"
            checked
            onChange={handleChangeValue}
          />
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

export default memo(ModalCreateChannel);
