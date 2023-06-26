import "./assets/css/reset.css";
import "./assets/css/style.css";

window.onload = function () {
  // Elements
  const calculateButton =
    document.getElementsByClassName("separator__button")[0];
  const day = document.getElementsByClassName("date__day")[0];
  const month = document.getElementsByClassName("date__month")[0];
  const year = document.getElementsByClassName("date__year")[0];
  const elapsedDays = document.getElementsByClassName("elapsed__days")[0];
  const elapsedMonths = document.getElementsByClassName("elapsed__months")[0];
  const elapsedYears = document.getElementsByClassName("elapsed__years")[0];
  const fieldsets = document.querySelectorAll(".date__fieldset");

  // Handlers
  const isInsideTimeInterval = (element, value, lower, upper) => {
    if (value >= lower && value <= upper) {
      element.parentElement.classList.remove("invalid__date");
      return true;
    } else {
      element.parentElement.classList.add("invalid__date");
      return false;
    }
  };

  function dateIsValid(date) {
    return date instanceof Date && !isNaN(date);
  }

  const EPOCH = new Date(0);
  const EPOCH_YEAR = EPOCH.getUTCFullYear();
  const EPOCH_MONTH = EPOCH.getUTCMonth();
  const EPOCH_DAY = EPOCH.getUTCDate();

  const calculateAge = (birthDate) => {
    const diff = new Date(Date.now() - birthDate.getTime());

    return {
      years: Math.abs(diff.getUTCFullYear() - EPOCH_YEAR),
      months: Math.abs(diff.getUTCMonth() - EPOCH_MONTH),
      days: Math.abs(diff.getUTCDate() - EPOCH_DAY),
    };
  };

  // Event Listeners
  calculateButton.addEventListener("click", (e) => {
    e.preventDefault();
    const validDay = isInsideTimeInterval(day, day.value, 1, 31);
    const validMonth = isInsideTimeInterval(month, month.value, 1, 12);
    const validYear = isInsideTimeInterval(
      year,
      year.value,
      1900,
      new Date().getFullYear()
    );
    if (!validDay || !validMonth || !validYear) return;

    const candidateDate = new Date(year.value, month.value, day.value);
    if (!dateIsValid(candidateDate)) {
      fieldsets.forEach((fs) => fs.classList.add("invalid__date"));
      return;
    }

    fieldsets.forEach((fs) => fs.classList.remove("invalid__date"));
    const age = calculateAge(candidateDate);
    elapsedDays.innerHTML = age.days;
    elapsedMonths.innerHTML = age.months;
    elapsedYears.innerHTML = age.years;
  });
};
