export const addZeroPad = (num: number | string) => {
  num = Number(num);
  return num < 10 ? `0${num}` : num;
};

const getLastDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

type CovertDateParamProps = {
  year: number;
  month: number;
  day?: number;
  isLastDay?: boolean;
};

export const covertDateParam = ({
  year,
  month,
  day,
  isLastDay,
}: CovertDateParamProps) => {
  const setDay = () => {
    day = day || 1;
    if (isLastDay) day = getLastDayOfMonth(year, month);
    return day;
  };

  const strMonth = addZeroPad(month);
  const strDay = addZeroPad(setDay());

  return `${year}-${strMonth}-${strDay}T00:00:00`;
};
