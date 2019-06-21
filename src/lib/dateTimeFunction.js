export const WeekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
export const monthText = [
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

export function getUTCWeek(day, shortLength) {
  let weeekNumber = day.getDay();
  if (shortLength > 0) {
    return WeekDays[weeekNumber].slice(0, shortLength);
  } else return WeekDays[weeekNumber];
}

export function getWeek(day, shortLength) {
  let weeekNumber = day;
  if (shortLength > 0) {
    return WeekDays[weeekNumber - 1].slice(0, shortLength);
  } else return WeekDays[weeekNumber - 1];
}

export function getMonthString(monthNumber, shortLength) {
  if (shortLength > 0) {
    return monthText[monthNumber - 1].slice(0, shortLength);
  } else return monthText[monthNumber - 1];
}

export function getUTCMonthsText(day, shortLength) {
  let monthNumber = day.getMonth();
  if (shortLength > 0) {
    return monthText[monthNumber].slice(0, shortLength);
  } else return monthText[monthNumber];
}
export const getUTCDateMonthFormat = (date, showShortMonth, showYear) => {
  let convertedDateTime = "";
  let currentDate = new Date();
  if (date) {
    let sentDate = new Date(date);
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
          sentDate.getDate() + " " + getUTCMonthsText(sentDate, 3);
      } else
        convertedDateTime =
          sentDate.getDate() + " " + getUTCMonthsText(sentDate);
    }
    if (showYear) {
      convertedDateTime = convertedDateTime + "  " + sentDate.getFullYear();
    }
  }
  return convertedDateTime;
};

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
  //input:date=YYYY-MM-DD
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
          sentDate.getDate() + " " + getUTCMonthsText(sentDate, 3);
      } else
        convertedDateTime =
          sentDate.getDate() + " " + getUTCMonthsText(sentDate);
    }
    if (showYear) {
      convertedDateTime = convertedDateTime + ", " + sentDate.getFullYear();
    }
  }
  return convertedDateTime;
};

export const getTimeAmPm = time => {
  let timeString = time;
  if (time) {
    let hour = +timeString.substr(0, 2);
    let formatedHour = hour % 12 || 12;
    formatedHour = formatedHour < 10 ? "0" + formatedHour : formatedHour;
    let ampm = hour < 12 ? " AM" : " PM";
    timeString = formatedHour + timeString.substr(2, 3) + ampm;
  }
  return timeString;
};

export const getWholeDayTimeFormat = (date, timeDetails) => {
  let dateString = "",
    timeString = "";
  if (date) {
    dateString = getDateMonthFormat(date, true);
  }
  if (timeDetails) {
    timeString = getTimeAmPm(timeDetails);
  }
  return dateString + " " + timeString;
};
