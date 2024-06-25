import React, { useState } from "react";
import "../assets/css/PCOSText.css";
import { useNavigate } from "react-router-dom";

function PCOSText() {
  const [currentPage, setCurrentPage] = useState(1);
  const [submitData,setSubmitData] = useState("Submit");
  const [success, setSucess] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    page1: {
      input1: null,
      input2: null,
      input3: null,
      input4: null,
      input5: null,
    },
    page2: {
      input6: null,
      input7: null,
      input8: null,
      input9: null,
      input10: null,
    },
    page3: {
      input11: null,
      input12: null,
      input13: null,
      input14: null,
      input15: null,
    },
    page4: {
      input16: null,
      input17: null,
      input18: null,
      input19: null,
      input20: null,
    },
    page5: {
      input21: null,
      input22: null,
      input23: null,
      input24: null,
      input25: null,
    },
  });

  const handleInputChange = (e) => {
    setSucess(null);
    const { name, value } = e.target;
    const page = `page${currentPage}`;
    // Clear the input field when it's changed
    e.target.value = "";
    setFormData({
      ...formData,
      [page]: {
        ...formData[page],
        [name]: value,
      },
    });
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitData("Loading...")
    // console.log("Form submitted:", formData)
    // console.log(typeof formData.page1.input1);
    //http://localhost:6000/pcos-test/basic-text
    const response = await fetch("http://localhost:1234/pcos-test/basic-text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        age: formData.page1.input1,
        weight: Math.ceil(Number(formData.page1.input2)),
        height: Math.ceil(Number(formData.page1.input3)),
        bmi: formData.page1.input4,
        bloodGroup: formData.page1.input5,
        pulseRate: formData.page2.input6,
        breathPerMinute: formData.page2.input7,
        heartRate: formData.page2.input8,
        missingCycle: formData.page2.input9,
        cycleLength: formData.page2.input10,
        marriageStatus: formData.page3.input11,
        pregnant: formData.page3.input12,
        noOfAborption: formData.page3.input13,
        hip: formData.page3.input14,
        waist: formData.page3.input15,
        hipWaistratio: formData.page4.input16,
        weightGain: formData.page4.input17,
        hairGrowth: formData.page4.input18,
        skinDarkening: formData.page4.input19,
        hairLoss: formData.page4.input20,
        pimple: formData.page5.input21,
        fastFood: formData.page5.input22,
        regularExercise: formData.page5.input23,
        bpSystolic: formData.page5.input24,
        bpPrastolic: formData.page5.input25,
        userToken:localStorage.getItem('access_token')
      }),
    });
    const result = await response.json();
    setSubmitData("Submit")
    console.log(result);
    if (result.isOk) setSucess("The Result is : " + result.message.result);
    setTimeout(() => {
      if (result.message.result == "PCOS") {
        navigate("/advance-pcos-test");
      }
    }, 3000)
  }

  const formInputData = [
    "Age",
    "Weight (in kg)",
    "Height (in cm)",
    "Bmi", //Automate
    "Blood Group",
    "Pulse rates",
    "Breath Per Minute",
    "Heart Beat Per Minute",
    "Missing Period Cycle",
    "Period Length",
    "Marriage Year",
    "Pregnant",
    "No of Aborption",
    "Hip (inch)",
    "Waist (inch)",
    "Waist:Hip Ratio",
    "Weight Gain",
    "Body Hair Grown",
    "Skin Darkening",
    "Hair Loss",
    "Pimples",
    "Fast Food",
    "Regular Exercise",
    "Bp-Systolic",
    "Bp-Prastolic",
  ];

  const renderInputs = () => {
    const page = `page${currentPage}`;
    return Object.keys(formData[page]).map((input, index) => (
      <div className="input-container" key={index}>
        {/* <label>{input}</label> */}
        {input === "input5" ? ( // Blood Group
          <select
            name={input}
            value={formData[page][input] || ""}
            onChange={handleInputChange}
            className="multipart-input"
          >
            <option value="">Select Blood Group</option>
            <option value="11">A+</option>
            <option value="12">A-</option>
            <option value="13">B+</option>
            <option value="14">B-</option>
            <option value="17">AB+</option>
            <option value="18">AB-</option>
            <option value="15">O+</option>
            <option value="16">O-</option>
          </select>
        ) : input === "input12" ||
          input === "input17" || // Weight Gain (Y/N)
          input === "input18" || // Body Hair Grown (Y/N)
          input === "input19" || // Skin Darkening (Y/N)
          input === "input20" || // Hair Loss (Y/N)
          input === "input21" || // Pimples (Y/N)
          input === "input22" || // Fats Food (Y/N)
          input === "input23" ? ( // Regular Exercise (Y/N)
          <select
            name={input}
            value={formData[page][input] || ""}
            onChange={handleInputChange}
            className="multipart-input"
          >
            <option value="">{`${
              formInputData[Number(input.substring(5)) - 1]
            }?`}</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        ) : (
          <input
            type="number"
            name={input}
            value={formData[page][input] || ""}
            onChange={handleInputChange}
            placeholder={`Enter ${
              formInputData[Number(input.substring(5)) - 1]
            }`}
            className="multipart-input"
          />
        )}
      </div>
    ));
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="pcos-form">
        <p className="text-center">Let's Test Your PCOS</p>
        {success != null ? (
          <p className="text-center text-success">{success}</p>
        ) : null}
        {renderInputs()}
        <div className="button-container">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="multipart-button"
          >
            Prev
          </button>
          {currentPage == 5 ? null : (
            <button
              type="button"
              onClick={handleNext}
              disabled={currentPage === 5}
            >
              Next
            </button>
          )}
          {currentPage === 5 && <button type="submit">{submitData}</button>}
        </div>
      </form>
    </div>
  );
}

export default PCOSText;
