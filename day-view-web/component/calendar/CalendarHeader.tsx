import { memo } from "react";
import styled from "styled-components";
import { YYMMType } from "@/types/calendat";

interface Props {
  selectedYYMM: YYMMType;
  handleMoveMonth: (flag: "prev" | "next") => void;
}

const CalendarHeader = ({ selectedYYMM, handleMoveMonth }: Props) => {
  return (
    <Wrap>
      <div></div>
      <div>
        <div>
          {selectedYYMM.year}년{selectedYYMM.month}월
        </div>
        <button onClick={() => handleMoveMonth("prev")}>이전</button>
        <button onClick={() => handleMoveMonth("next")}>다음</button>
      </div>
    </Wrap>
  );
};

export default memo(CalendarHeader);

const Wrap = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0.5rem;

  & > div {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;
