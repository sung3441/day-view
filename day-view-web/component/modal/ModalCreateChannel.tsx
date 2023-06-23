import { memo, SyntheticEvent, useState } from 'react';
import styled from 'styled-components';

import Modal from '@/shared/component/modal';
import { pixelToRemUnit } from '@/shared/styles/util';
import { ModalProps } from '@/component/modal/ModalRenderer';
import { useAnimationHandler } from '@/shared/hooks';
import useCreateChannel from '@/component/calendar/channelSection/hooks/usePostChannel';

/**
 * 카테고리 생성
 */

type CreateChannel = {
  categoryName: string;
  isPrivate: boolean;
};

const ModalCreateChannel = ({ closeModal }: ModalProps) => {
  const { isShow, handleIsShow, handleOnAnimationEnd } = useAnimationHandler(
    () => closeModal('CreateCategory')
  );

  const [value, setValue] = useState<CreateChannel>({
    categoryName: '',
    isPrivate: false,
  });

  const { mutate, status } = useCreateChannel();

  const handleChangeValue = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const { name, value, checked } = target;

    switch (name) {
      case 'categoryName':
        setValue((prev) => ({ ...prev, categoryName: value }));
        break;
      case 'toggle':
        setValue((prev) => ({ ...prev, isPrivate: checked }));
        break;
    }
  };

  // TODO status 상태에 따른 다음 동작필요
  // 1. 성공시 모달 닫기
  // 2. 실패시 에러메세지 띄우기 -> 제가 할게요
  // 3. 로딩시 버튼 disabled
  const handleCreateChannel = () => {
    mutate({ name: value.categoryName, secretYn: value.isPrivate });
  };

  return (
    <Modal isShow={isShow} onAnimationEnd={handleOnAnimationEnd}>
      <Modal.Header>
        <Modal.Title>새 카테고리 만들기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Modal.Section>
          <Modal.SubTitle>카테고리 이름</Modal.SubTitle>
          <Modal.Input
            type="text"
            name="categoryName"
            value={value.categoryName}
            onChange={handleChangeValue}
            placeholder="이름을 입력하세요."
          />
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
        <Modal.Button variant="primary" onClick={() => handleIsShow()}>
          취소
        </Modal.Button>
        <Modal.Button variant="accent" onClick={handleCreateChannel}>
          완료
        </Modal.Button>
      </Modal.Control>
      <Modal.Dim onClick={() => handleIsShow} />
    </Modal>
  );
};

export default memo(ModalCreateChannel);

const WrapButton = styled.div`
  width: ${pixelToRemUnit(380)};
`;
