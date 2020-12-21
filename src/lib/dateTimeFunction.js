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
export const getUTCDateMonthFormat = (
  date,
  showShortMonth,
  showYear,
  showYesterToday = true,
  showTomorrow = false
) => {
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
    if (dayDifference === 0 && showYesterToday) convertedDateTime = "Today";
    else if (dayDifference === 1 && showYesterToday)
      convertedDateTime = "Yesterday";
    else if (dayDifference === -1 && showTomorrow)
      convertedDateTime = "Tomorrow";
    else {
      if (showShortMonth) {
        convertedDateTime =
          sentDate.getDate() + " " + getUTCMonthsText(sentDate, 3);
      } else
        convertedDateTime =
          sentDate.getDate() + " " + getUTCMonthsText(sentDate);
    }
    if (
      showYear &&
      convertedDateTime !== "Today" &&
      convertedDateTime !== "Yesterday" &&
      convertedDateTime !== "Tomorrow"
    ) {
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
  return dateString + ", " + timeString;
};

export const oridinalNumberDateFormat = date => {
  const dateSplit = date.split(" ");
  let oridinalNumber = "";
  if (dateSplit[0] == 1 || dateSplit[0] == 21 || dateSplit[0] == 31) {
    oridinalNumber = "st";
  } else if (dateSplit[0] == 2 || dateSplit[0] == 22) {
    oridinalNumber = "nd";
  } else if (dateSplit[0] == 3 || dateSplit[0] == 23) {
    oridinalNumber = "rd";
  } else {
    oridinalNumber = "th";
  }
  return `${dateSplit[0]}${oridinalNumber} ${dateSplit[1]} ${dateSplit[2]} ${dateSplit[3]}`;
};

//Number with thousand seperated value.
export const numberWithCommas = x =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

var a = [
  "",
  "one ",
  "two ",
  "three ",
  "four ",
  "five ",
  "six ",
  "seven ",
  "eight ",
  "nine ",
  "ten ",
  "eleven ",
  "twelve ",
  "thirteen ",
  "fourteen ",
  "fifteen ",
  "sixteen ",
  "seventeen ",
  "eighteen ",
  "nineteen "
];
var b = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety"
];
export function getDateMonthFormate(dateWithMonth, hideDelay) {
  let date = dateWithMonth.getDate();
  let month = dateWithMonth.getMonth() + 1;
  let year = dateWithMonth.getFullYear();
  let isDelayed = "";
  if (!hideDelay) {
    isDelayed =
      new Date(dateWithMonth).setHours(0, 0, 0, 0) <
      new Date().setHours(0, 0, 0, 0)
        ? " (Delayed)"
        : "";
  }

  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  switch (date) {
    case 1:
    case 21:
    case 31:
      return "" + date + "st " + monthNames[month - 1] + " " + year + isDelayed;
    case 2:
    case 22:
      return "" + date + "nd " + monthNames[month - 1] + " " + year + isDelayed;
    case 3:
    case 23:
      return "" + date + "rd " + monthNames[month - 1] + " " + year + isDelayed;
    default:
      return "" + date + "th " + monthNames[month - 1] + " " + year + isDelayed;
  }
}
export function getDayNumberSuffix(d, hideDelay) {
  let dateWithMonth =
    d.split(" ").length !== 2
      ? d.replace(/(\d{2}) (\d{2}) (\d{4})/, "$2/$1/$3")
      : d.split(" ")[0].replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3");
  dateWithMonth = new Date(dateWithMonth);

  if (dateWithMonth) {
    return getDateMonthFormate(dateWithMonth, hideDelay);
  } else return "";
}

export const digitIntoWord = num => {
  if ((num = num.toString()).length > 9) return "overflow";
  let n = ("000000000" + num)
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;
  var str = "";
  str +=
    n[1] != 0
      ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "crore "
      : "";
  str +=
    n[2] != 0
      ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "lakh "
      : "";
  str +=
    n[3] != 0
      ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "thousand "
      : "";
  str +=
    n[4] != 0
      ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "hundred "
      : "";
  str +=
    n[5] != 0
      ? (str != "" ? "and " : "") +
        (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
        "only "
      : "";
  return str;
};
export function get24HrsTime(date) {
  return date.toLocaleTimeString("en-US", { hour12: false });
}
