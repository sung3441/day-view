import { YYMMType } from "@/types/calendat";

export function getTodayYYMM(): YYMMType {
  const today = new Date();
  return { year: today.getFullYear(), month: today.getMonth() + 1 };
}

export function getStrToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  return `${year.toString()}-${month.toString()}-${date.toString()}`;
}
