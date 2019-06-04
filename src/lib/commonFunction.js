const WeekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
const monthText = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export function getCurrentDate() {
  var currentDate = new Date();
  return currentDate;
}
export function getWeek(day, shortLength) {
  let weeekNumber = day.getDay();
  if (shortLength > 0) {
    return WeekDays[weeekNumber].slice(0, shortLength);
  } else return WeekDays[weeekNumber];
}
export function getMonthsText(day, shortLength) {
  let monthNumber = day.getMonth();
  if (shortLength > 0) {
    return monthText[monthNumber].slice(0, shortLength);
  } else return monthText[monthNumber];
}
export function getNumberOfDaysInMonth(month, year) {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}
export const getDateMonthFormat = (date, showShortMonth, showYear) => {
  let convertedDateTime = "";
  let currentDate = new Date();
  if (date) {
    var dates = date.split("-");
    let sentDate = new Date(dates[0], dates[1] - 1, dates[2]);
    let dayDifference = Math.floor(
      (Date.UTC(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      ) -
        Date.UTC(
          sentDate.getFullYear(),
          sentDate.getMonth(),
          sentDate.getDate()
        )) /
        (1000 * 60 * 60 * 24)
    );
    if (dayDifference === 0) convertedDateTime = "Today";
    else if (dayDifference === 1) convertedDateTime = "Yesterday";
    else {
      if (showShortMonth) {
        convertedDateTime =
          sentDate.getDate() + " " + getMonthsText(sentDate, 3);
      } else
        convertedDateTime = sentDate.getDate() + " " + getMonthsText(sentDate);

      if (showYear) {
        convertedDateTime = convertedDateTime + " " + sentDate.getFullYear();
      }
    }
  }
  return convertedDateTime;
};
export const getTimeAmPm = time => {
  let ts = time;
  if (time) {
    let H = +ts.substr(0, 2);
    let h = H % 12 || 12;
    h = h < 10 ? "0" + h : h;
    let ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;
  }
  return ts;
};
export const getWholeDayTimeFormat = (date, timeDetail) => {
  let convertedDayTime = getDateMonthFormat(date, true);
  let time = getTimeAmPm(timeDetail);
  return convertedDayTime + " " + time;
};
