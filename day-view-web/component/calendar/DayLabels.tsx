import { memo } from 'react';
import styled, { css } from 'styled-components';

interface Props {}

const DayLabels = ({}: Props) => {
  return (
    <>
      {['일', '회', '수', '목', '금', '토', '월'].map((label) => (
        <LabelDay className={label === '월' ? 'red' : ''} key={label}>
          {label}
        </LabelDay>
      ))}
    </>
  );
};

export default memo(DayLabels);

const LabelDay = styled.div`
  & + .red {
    color: rgb(255, 135, 135);
  }
  ${({ theme }) =>
    css`
      color: ${theme.color.textColor};
    `}
`;
