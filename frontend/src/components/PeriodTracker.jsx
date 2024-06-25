import React, { useState } from "react";
import "../assets/css/PeriodTracker.css"; // Import CSS file for styling

const PeriodTracker = () => {
  const [startDate, setStartDate] = useState(null);
  const [cycleLength, setCycleLength] = useState("");
  const [periodDates, setPeriodDates] = useState([]);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleCycleLengthChange = (e) => {
    setCycleLength(parseInt(e.target.value));
  };

  const calculatePeriodDates = () => {
    const start = new Date(startDate);
    const nextPeriodDates = [];
    for (let i = 0; i < 3; i++) {
      // Calculating period dates for the next 3 months
      const nextPeriodStart = new Date(start);
      nextPeriodStart.setMonth(start.getMonth() + i);
      const nextPeriodEnd = new Date(nextPeriodStart);
      nextPeriodEnd.setDate(nextPeriodStart.getDate() + cycleLength - 1);
      const formattedStartDate = `${nextPeriodStart.getDate()}/${
        nextPeriodStart.getMonth() + 1
      }/${nextPeriodStart.getFullYear()}`;
      const formattedEndDate = `${nextPeriodEnd.getDate()}/${
        nextPeriodEnd.getMonth() + 1
      }/${nextPeriodEnd.getFullYear()}`;
      nextPeriodDates.push({
        start: formattedStartDate,
        end: formattedEndDate,
      });
    }
    setPeriodDates(nextPeriodDates);
  };

  return (
    <div className="period-tracker-container">
      <h2>Period Tracker</h2>
      <form className="period-form">
        <label htmlFor="startDate">Period Start Date:</label>
        <br />
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={handleStartDateChange}
        />
        <br />
        <label htmlFor="cycleLength">Period Cycle Length (in days):</label>
        <br />
        <input
          type="number"
          id="cycleLength"
          value={cycleLength}
          onChange={handleCycleLengthChange}
        />
        <br />
        <button type="button" onClick={calculatePeriodDates}>
          Calculate Period Dates
        </button>
      </form>
      <hr></hr>
      {periodDates.length !=0 ? (
        <div className="period-dates">
          <p>Expected Period Dates for Next 3 Months:</p>
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {periodDates.map((period, index) => (
                <tr key={index}>
                  <td>{`Month ${index + 1}`}</td>
                  <td>{`${period.start}`}</td>
                  <td>{`${period.end}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default PeriodTracker;
