import styled, { css } from 'styled-components';
import { memo } from 'react';

const Labels = () => {
  return (
    <>
      {['일', '화', '수', '목', '금', '토', '월'].map((label) => (
        <LabelDay className={label === '일' ? 'red' : ''} key={label}>
          <div>{label}</div>
        </LabelDay>
      ))}
    </>
  );
};

export default memo(Labels);

const LabelDay = styled.div`
  font-weight: 400;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

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
