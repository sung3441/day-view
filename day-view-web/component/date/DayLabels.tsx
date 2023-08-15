import { memo } from 'react';
import styled, { css } from 'styled-components';
import { pixelToRemUnit } from '@/shared/styles/util';

interface Props {}

const DayLabels = ({}: Props) => {
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

export default memo(DayLabels);

const LabelDay = styled.div`
  padding-left: ${pixelToRemUnit(12)};
  font-weight: 400;
  font-size: 16px;

  & + & {
    border-right: 1px solid #ccc;
  }

  ${({ theme }) =>
    css`
      color: ${theme.color.textColor};
    `}

  &.red {
    color: #cf0f0f;
    border-right: 1px solid #ccc;
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
  }
`;
