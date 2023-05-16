import { Children, ComponentPropsWithRef } from 'react';
import styled from 'styled-components';

type InputType = ComponentPropsWithRef<'div'>;

interface Props extends InputType {}

const ModalBody = ({ children }: Props) => {
  return (
    <S.Body>
      {Children.map(children, (child) => (
        <S.Section>{child}</S.Section>
      ))}
    </S.Body>
  );
};

export default ModalBody;

const S = {
  Body: styled.div`
    display: flex;
    flex-direction: column;
    gap: 22px;
  `,
  Section: styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    & section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
  `,
};
