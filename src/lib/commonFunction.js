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
export const getDateMonthFormat = dateObj => {
  let time = dateObj.time;
  let date = dateObj.date;
  let shortLength = dateObj.fullLength ? dateObj.fullLength : 0;
  let showYear = dateObj.showYear ? dateObj.showYear : 0;
  let convertedDateTime = "";
  if (time && date) {
    let currentDate = new Date();

    let sentDate = new Date((date + " " + time).replace(/-/g, "/"));
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
      if (!shortLength) {
        convertedDateTime =
          sentDate.getDate() + " " + monthText[sentDate.getMonth()].slice(0, 3);
      } else
        convertedDateTime =
          sentDate.getDate() + " " + monthText[sentDate.getMonth()];

      if (showYear) {
        convertedDateTime = convertedDateTime + " " + sentDate.getFullYear();
      }
    }
    return convertedDateTime;
  } else {
    return "error";
  }
};
export const getTimeAmPm = time => {
  if (time) {
    let ts = time;
    let H = +ts.substr(0, 2);
    let h = H % 12 || 12;
    h = h < 10 ? "0" + h : h;
    let ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
  } else {
    return "error";
  }
};

export const getWholeDayTimeFormat = dateObj => {
  if (dateObj) {
    let convertedDayTime = getDateMonthFormat(dateObj);
    let time = getTimeAmPm(dateObj.time);
    return convertedDayTime + " " + time;
  } else {
    return "error";
  }
};
