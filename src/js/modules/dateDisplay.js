const dateDisplay = function () {
  let currentDate = new Date().getDate();
  let currentDay = new Date().getDay();
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  let currentHour = new Date().getHours();
  let currentMin = new Date().getMinutes();
  let currentSec = new Date().getSeconds();

  function getDayOfWeek(day) {
    switch (day) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default:
        return "Invalid day";
    }
  }

  function getMonthName(month) {
    switch (month) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";
      default:
        return "Invalid month";
    }
  }

  //FIRST

  document.querySelector(".displayDateBox").textContent = `${getDayOfWeek(
    currentDay
  )}, ${currentDate}th of ${getMonthName(
    currentMonth
  )} ${currentYear} - ${currentHour}:${currentMin
    .toString()
    .padStart(2, "0")}:${currentSec.toString().padStart(2, "0")}`;

  // SET
};

export default dateDisplay;
