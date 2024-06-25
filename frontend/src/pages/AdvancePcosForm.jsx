import React, { useState } from "react";
import "../assets/css/PCOSText.css";
import { useNavigate } from "react-router-dom";

const AdvancePcosForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amh: "",
    tsh: "",
    fsh_lh: "",
    prl: "",
    hb: "",
    rbs: "",
    userToken:localStorage.getItem('access_token')
  });

  const [buttonMessage, setButtonMessage] = useState("Submit");
  const [message, setMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setButtonMessage("Loading....");
    const response = await fetch(
      "http://localhost:1234/pcos-test/advance-text",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const result = await response.json();
    setButtonMessage("Submit");
    console.log(result);
    setMessage(result.message.result);
    if (result.message.result != "Adernal") {
      setTimeout(() => {
        navigate("/diet-plan");
      }, 5000);
    } else {
      setTimeout(() => {
        navigate("/doctor-list");
      }, 5000);
    }
  }

  return (
    <div className="advanceForm">
      <form>
        <p className="text-center fs-4">Advance PCOS Test</p>
        {message != null ? (
          <>
            <p className="text-center fs-5 text-danger">
              Type of PCOS is : {message}
            </p>
            <p className="text-center">Wait We are taking you to desired diagnosis page</p>
          </>
        ) : null}
        <input
          type="text"
          placeholder="Enter TSH Value"
          onChange={(e) => {
            setFormData({ ...formData, tsh: e.target.value });
            setMessage(null);
          }}
        />
        <input
          type="text"
          placeholder="Enter AMH Value"
          onChange={(e) => {
            setFormData({ ...formData, amh: e.target.value });
            setMessage(null);
          }}
        />
        <input
          type="text"
          placeholder="Enter FSH-LH Value"
          onChange={(e) => {
            setFormData({ ...formData, fsh_lh: e.target.value });
            setMessage(null);
          }}
        />
        <input
          type="text"
          placeholder="Enter PRL Value"
          onChange={(e) => {
            setFormData({ ...formData, prl: e.target.value });
            setMessage(null);
          }}
        />
        <input
          type="text"
          placeholder="Enter HB Value"
          onChange={(e) => {
            setFormData({ ...formData, hb: e.target.value });
            setMessage(null);
          }}
        />
        <input
          type="text"
          placeholder="Enter RBS Value"
          onChange={(e) => {
            setFormData({ ...formData, rbs: e.target.value });
            setMessage(null);
          }}
        />
        <button onClick={handleSubmit}>{buttonMessage}</button>
      </form>
    </div>
  );
};

export default AdvancePcosForm;
