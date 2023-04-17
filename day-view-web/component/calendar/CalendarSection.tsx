import { memo, useRef, useState } from "react";
import { YYMMType } from "@/types/calendat";
import CalendarDates from "@/component/calendar/CalendarDates";
import styled from "styled-components";
import DayLabels from "@/component/calendar/DayLabels";
import CalendarHeader from "@/component/calendar/CalendarHeader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux";
import { setSelectedYYMM } from "@/redux/calendarReducer";

interface Props {}

const CalendarSection = ({}: Props) => {
  const selectedYYMM = useSelector(
    (root: RootState) => root.calendar.selectedYYMM
  );

  const dispatch = useDispatch();

  const handleMoveMonth = (flag: "prev" | "next") => {
    let { year, month } = selectedYYMM;
    month = flag === "prev" ? --month : ++month;
    const d = new Date(year, month, 0);
    dispatch(
      setSelectedYYMM({ year: d.getFullYear(), month: d.getMonth() + 1 })
    );
  };

  // console.log(monthRef.current);

  return (
    <CalderWrap>
      <CalendarHeader
        selectedYYMM={selectedYYMM}
        handleMoveMonth={handleMoveMonth}
      />
      <MonthWrap>
        <DayLabels />
        <CalendarDates {...selectedYYMM} />
      </MonthWrap>
    </CalderWrap>
  );
};

export default memo(CalendarSection);

const CalderWrap = styled.div`
  height: 100%;
  width: 100%;
`;

const MonthWrap = styled.div`
  width: 100%;
  height: calc(100vh - 40px - 60px);
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 30px;
  //grid-auto-rows: minmax(
  //  calc(100vh - 40px - 60px) / 7,
  //  calc(100vh - 40px - 60px) / 6
  //);
`;
