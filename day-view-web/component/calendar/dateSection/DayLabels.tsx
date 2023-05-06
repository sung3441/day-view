import { memo } from 'react';
import styled, { css } from 'styled-components';

interface Props {}

const DayLabels = ({}: Props) => {
  return (
    <>
      {['일', '회', '수', '목', '금', '토', '월'].map((label) => (
        <LabelDay className={label === '일' ? 'red' : ''} key={label}>
          <div>{label}</div>
        </LabelDay>
      ))}
    </>
  );
};

export default memo(DayLabels);

const LabelDay = styled.div`
  padding: 4px 0 0 18px;
  font-weight: 400;
  font-size: 16px;

  ${({ theme }) =>
    css`
      color: ${theme.color.textColor};
    `}

  &.red {
    color: #cf0f0f;
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
  }
`;
