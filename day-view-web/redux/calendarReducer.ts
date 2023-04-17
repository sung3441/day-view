import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { YYMMType } from "@/types/calendat";
import { getStrToday, getTodayYYMM } from "@/util/calender";

// https://kyounghwan01.github.io/blog/React/redux/redux-toolkit/#%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%84%82%E1%85%B3%E1%86%AB-%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%B2
interface CalendarType {
  selectedYYMM: YYMMType;
  selectedDay: string;
}

const initialState: CalendarType = {
  selectedYYMM: getTodayYYMM(),
  selectedDay: getStrToday(),
};

const slice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setSelectedYYMM: (state, action: PayloadAction<YYMMType>) => {
      state.selectedYYMM = action.payload;
    },
    setSelectedDay: (state, action: PayloadAction<string>) => {
      state.selectedDay = action.payload;
    },
  },
});

export const { setSelectedYYMM, setSelectedDay } = slice.actions;

const calendarReducer = slice.reducer;
export default calendarReducer;
