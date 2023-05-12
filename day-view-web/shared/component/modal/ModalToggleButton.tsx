import { ChangeEvent, useState } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  subTitle?: string;
}

const ModalToggleButton = ({ subTitle }: Props) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  return (
    <S.Section>
      {subTitle && <S.SubTitle>{subTitle}</S.SubTitle>}
      <Label>
        <Input type="checkbox" onChange={handleChange} checked={isChecked} />
        <Switch />
      </Label>
    </S.Section>
  );
};

export default ModalToggleButton;

const S = {
  Section: styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    width: 100%;
  `,

  SubTitle: styled.div`
    ${({ theme }) => theme.fonts.caption2};
    color: ${({ theme }) => theme.colors.G_700};
  `,
};

const Label = styled.label`
  gap: 10px;
  cursor: pointer;
`;

const Switch = styled.div`
  position: relative;
  width: 42px;
  height: 22px;
  background: #b3b3b3;
  border-radius: 32px;
  padding: 4px;
  transition: 250ms all;

  &:before {
    transition: 250ms all;
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 35px;
    top: 50%;
    left: 4px;
    background: white;
    transform: translate(0, -50%);
  }
`;

const Input = styled.input`
  position: absolute;
  opacity: 0;

  &:checked + ${Switch} {
    background: ${({ theme }) => theme.colors.main};

    &:before {
      transform: translate(18px, -50%);
    }
  }
`;
