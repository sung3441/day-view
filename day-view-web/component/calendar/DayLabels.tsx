import { memo } from "react";
import styled, { css } from "styled-components";

interface Props {}

const DayLabels = ({}: Props) => {
  return (
    <>
      {["월", "회", "수", "목", "금", "토", "일"].map((label) => (
        <LabelDay className={label === "일" ? "red" : ""} key={label}>
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
