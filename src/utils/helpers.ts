import { CalendarMonths } from "../constants/constants";

const MONTHS_FACTOR: { [x: string]: number } = {
  "January": 0,
  "JanuaryLeapYr": 6,
  "February": 3,
  "FebruaryLeapYr": 2,
  "March": 3,
  "April": 6,
  "May": 1,
  "June": 4,
  "July": 6,
  "August": 2,
  "September": 5,
  "October": 0,
  "November": 3,
  "December": 5
}

export const calculateDayOfTheWeek = (month: string, year: number): number => {
  const centuryFactor = (3 - (Math.floor(year / 100) % 4)) * 2;
  const yearFactor = parseInt(year.toString().slice(2));
  const leapYearFactor = Math.floor(yearFactor / 4);
  let monthFactor = MONTHS_FACTOR[month];


  if (month === CalendarMonths.FEBRUARY) {
    if (isLeapYear(year)) {
      monthFactor = MONTHS_FACTOR[`${month}LeapYr`]
    }
  }

  return (centuryFactor + yearFactor + leapYearFactor + monthFactor + 1) % 7;
}


const isLeapYear = (year: number) => {

  const firstCheck = year % 4;
  const secondCheck = year % 100 !== 0;
  const thirdCheck = year % 100 === 0 && year % 400 === 0;

  return firstCheck && (secondCheck || thirdCheck)

}

export const generateDatesData = (month: string, selectedDate: Date, monthIndex: number) => {
  const firstDateOfTheMonth = new Date(`${month} ${1}, ${selectedDate.getFullYear()}`);
  const dayOfTheWeek = calculateDayOfTheWeek(month, selectedDate.getFullYear());

  const dates = [];

  for (let day = 0; day < 42; day++) {
    // if (day === 0 && dayOfTheWeek === 0) {
    //   firstDateOfTheMonth.setDate(firstDateOfTheMonth.getDate() - 7);
    // } else 
    if (day === 0) {
      firstDateOfTheMonth.setDate(firstDateOfTheMonth.getDate() + (day - dayOfTheWeek));
    } else {
      firstDateOfTheMonth.setDate(firstDateOfTheMonth.getDate() + 1);
    }

    dates.push({
      date: (new Date(firstDateOfTheMonth)),
      isCurrentMonth: firstDateOfTheMonth.getMonth() === monthIndex,
      isCurrentDate: firstDateOfTheMonth.toLocaleDateString() === (new Date().toLocaleDateString()),
      isSelectedDate: firstDateOfTheMonth.toLocaleDateString() === selectedDate.toLocaleDateString()
    })

  }
  return dates;
}

export const generateYearsData = (year: number) => {
  const yearString = year.toString();
  const years = [];
  const baseYear = parseInt(yearString.slice(0, 2) + "00");
  const tensInYear = parseInt(yearString[2] + "0")
  const tempYear = baseYear + tensInYear

  years.push(tempYear - 1);
  years.push(tempYear);

  for (let i = 1; i <= 10; i++) {
    years.push(tempYear + i)
  }

  return years;

}