import React, { useState } from "react";
import "../assets/css/BMI.css";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmiResult, setBmiResult] = useState(null);

  const calculateBMI = (e) => {
    e.preventDefault();
    const heightInMeter = height / 100; // Convert height to meters
    const bmi = weight / (heightInMeter * heightInMeter);
    setBmiResult(bmi);
  };

  const getBmiCategory = (bmi) => {
    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
      return "Normal weight";
    } else if (bmi >= 25 && bmi < 30) {
      return "Overweight";
    } else {
      return "Obese";
    }
  };

  return (
    <div className="bmi-parent">
      <form className="bmi-form" onSubmit={calculateBMI}>
        <p className="form-title">Let's check your BMI</p>
        <div className="input-container">
          <input
            type="number"
            placeholder="Enter weight in kg"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="number"
            placeholder="Enter height in cm"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <button type="submit" className="submit">
          Calculate BMI
        </button>
        {bmiResult && (
          <div className="bmi-result mt-3 text-center">
            <p>Your BMI: {bmiResult.toFixed(2)}</p>
            <p>Category: {getBmiCategory(bmiResult)}</p>
          </div>
        )}
        <div className="bmi-parent2 text-center mt-2">
            <div className="child" style={{fontSize:"12px",backgroundColor:"blue"}}><span><i class="bi bi-chevron-left"></i> {18.4}<br></br>Under Weight</span></div>
            <div className="child" style={{fontSize:"12px",backgroundColor:"green"}}><span>18.5-25<br></br>Normal Weight</span></div>
            <div className="child" style={{fontSize:"12px",backgroundColor:"orange"}}><span>25-29.9<br></br>Over Weight</span></div>
            <div className="child" style={{fontSize:"12px",backgroundColor:"red"}}><span><i class="bi bi-chevron-right"></i> {30}<br></br>Obese Weight</span></div>
        </div>
      </form>
    </div>
  );
};

export default BMICalculator;
