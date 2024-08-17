import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const RegistrationStage2 = ({ onNext, onBack, setFormData }) => {
  const [months] = useState([
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
    "December",
  ]);
  const [days, setDays] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [isValid, setIsValid] = useState(false);

  // Populate days (1-31)
  // Populate years (from 1919 to current year)
  useEffect(() => {
    setDays(Array.from({ length: 31 }, (_, i) => i + 1));
    const currentYear = new Date().getFullYear();
    setYears(
      Array.from({ length: currentYear - 1918 }, (_, i) => currentYear - i)
    );
  }, []);

  // Update days based on month and year
  useEffect(() => {
    if (selectedMonth && selectedYear) {
      const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
      if (daysInMonth < selectedDay) {
        setSelectedDay(daysInMonth);
      }
      setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));
    }
  }, [selectedDay, selectedMonth, selectedYear]);

  // Validate if all fields are selected and are not very recent.
  useEffect(() => {
    const today = new Date();
    const fourYearsAgo = new Date(
      today.getFullYear() - 4,
      today.getMonth(),
      today.getDate()
    );
    if (selectedMonth && selectedDay && selectedYear) {
      const selectedDate = new Date(
        selectedYear,
        selectedMonth - 1,
        selectedDay
      );

      if (selectedDate < fourYearsAgo) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else {
      setIsValid(false);
    }
  }, [selectedMonth, selectedDay, selectedYear]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid) {
      const dateOfBirth = {
        day: selectedDay,
        month: selectedMonth,
        year: selectedYear,
      };
      setFormData((prevFormData) => ({
        ...prevFormData,
        dateOfBirth: dateOfBirth,
      }));
      onNext();
    }
  };

  return (
    <form className="auth-form-container" onSubmit={handleSubmit}>
      <img src="/birthday.png" alt="birthday" className="birthday-icon" />
      <div className="title-container">
        <span className="title">Date of Birth</span>
        <span className="subtitle">
          This won&#039; t be part of your public profile.
        </span>
      </div>
      <div className="date-picker-container">
        <select
          className="date-picker-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="" disabled>
            Month
          </option>
          {months.map((month, index) => (
            <option key={index} value={index + 1}>
              {month}
            </option>
          ))}
        </select>
        <select
          className="date-picker-select"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          <option value="" disabled>
            Day
          </option>
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <select
          className="date-picker-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="" disabled>
            Year
          </option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <span className="subtitle">
        You need to enter the date you were born on.
      </span>
      <span className="subtitle">
        Use your own date of birth, even if this account is <br /> for a
        business, pet or something else
      </span>
      <button
        type="submit"
        className={`register-next-button ${isValid ? "" : "disabled"}`}
        disabled={!isValid}
      >
        Next
      </button>
      <button className="back-button" onClick={onBack}>
        <i className="uil uil-angle-left"></i>
      </button>
    </form>
  );
};

RegistrationStage2.propTypes = {
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default RegistrationStage2;
