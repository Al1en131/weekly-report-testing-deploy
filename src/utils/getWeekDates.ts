import { format } from "date-fns/format";

export function getWeekDates(year: number, month: number) {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const weekDates = [];
  const bagi: any[] = [];
  let currentDate = firstDayOfMonth;

  while (currentDate <= lastDayOfMonth) {
    if (currentDate.getDay() >= 1 && currentDate.getDay() <= 5) {
      weekDates.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  let tempdate: any[] = [];
  let no = 1;
  weekDates.forEach((value) => {
    const split = format(new Date(value), "EE");
    const dd = format(new Date(value), "dd");

    if (split == "Fri") {
      tempdate.push(dd);

      bagi.push({ name: "Week " + no++, value: tempdate });
      tempdate = [];
    } else {
      tempdate.push(dd);
    }
  });

  return bagi;
}
