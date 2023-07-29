import { useState, SyntheticEvent, memo, useEffect } from 'react';

import { useAnimationHandler } from '@/shared/hooks';

import { ModalProps } from './ModalRenderer';
import useValidation from '@/shared/hooks/useValidation';
import Modal from '@/shared/component/Organism/MODAL';
import { usePutChannel } from '@/shared/context/calendar/hooks/usePostChannel';
import useModalState from '@/shared/hooks/useModalState';

type ManageChannel = {
  channelName: string;
};

const ModalManageChannel = ({ closeModal }: ModalProps) => {
  const {
    isShow,
    handleIsShow: modalClose,
    handleOnAnimationEnd,
  } = useAnimationHandler(() => closeModal('ManageChannel'));

  const { channelId, name = '' } = useModalState('ManageChannel');

  const [value, setValue] = useState<ManageChannel>({
    channelName: name,
  });

  // 채널이름 길이 유효성 검사
  const { isValid, InvalidMessage, validate } =
    useValidation('channelNameLength');

  /**
   * TODO: 유효성 검사 두 개 합치기
   */
  const { isValid: isValidNameDiff, validate: validateNameDiff } =
    useValidation('isNameDifferent');

  useEffect(() => {
    validate(name);
  }, [name, validate]);

  const { mutate, status } = usePutChannel();

  const handleChangeValue = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    switch (target.name) {
      case 'channelName':
        validate(target.value);
        validateNameDiff([name, target.value]);
        setValue((prev) => ({ ...prev, channelName: target.value }));
        break;
    }
  };

  // TODO status 상태에 따른 다음 동작필요
  // 1. 성공시 모달 닫기
  // 2. 실패시 에러메세지 띄우기
  // 3. 로딩시 버튼 disabled
  const handleManageChannel = () => {
    if (!channelId) return;
    mutate({ channelId, name: value.channelName });
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
              name="channelName"
              value={value.channelName}
              onChange={handleChangeValue}
              placeholder="이름을 입력하세요."
              isValid={isValid}
            />
            {!isValid && (
              <Modal.InvalidText>{InvalidMessage}</Modal.InvalidText>
            )}
          </Modal.Wrapper>
        </Modal.Section>
      </Modal.Body>
      <Modal.Control>
        <Modal.Button variant="primary" onClick={modalClose}>
          취소
        </Modal.Button>
        <Modal.Button
          variant="accent"
          onClick={handleManageChannel}
          disabled={!isValid || !isValidNameDiff}
        >
          완료
        </Modal.Button>
      </Modal.Control>
      <Modal.Dim />
    </Modal>
  );
};

export default memo(ModalManageChannel);
