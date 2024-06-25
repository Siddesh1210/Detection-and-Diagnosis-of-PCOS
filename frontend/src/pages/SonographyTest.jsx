import React, { useState } from "react";
import "../assets/css/Sonography.css";
import { useNavigate } from "react-router-dom";

const SonographyTest = () => {
    const navigate=useNavigate();
  const [file, setFile] = useState(null);
  const [buttonMessage,setButtonMessage] = useState("Submit");
  const [pcos,setPCOS]=useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonMessage("Loading.....");
    if (!file) {
      alert("Please select a file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("sonography-image", file);

      const response = await fetch("http://localhost:1234/pcos-test/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setButtonMessage("Submit")
      if (data.isOk) {
        if (data.data.result === "Affected") {
            setPCOS("affected")
            setTimeout(()=>{
                navigate("/advance-pcos-test")
            },5000)
        //   alert("PCOS detected!");
        } else {
            setPCOS("not affected")
            setTimeout(()=>{
                navigate("/")
            },5000)
        //   alert("Not Affected");
        }
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred. Please try again later.");
    }
  };

  return (
    <div className="sonography-div">
      <form className="sonography-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <h3 style={{ fontSize: "18px", fontWeight: "normal" }}>
          Let's test your Sonography Report
        </h3>
        {
            pcos!= null? (
                <p className={pcos=="affected"?"text-danger":"text-success"}>Result is {pcos} with PCOS</p>
            ) : null
        }
        <span className="form-title">Upload your file</span>
        <p className="form-paragraph">File should be an image</p>
        <label htmlFor="file-input" className="drop-container">
          <span className="drop-title">Drop files here</span>
          or
          <input
            type="file"
            accept="image/*"
            required
            id="file-input"
            onChange={handleFileChange}
          />
        </label>
        <button type="submit" className="submit-button">
          {buttonMessage}
        </button>
      </form>
    </div>
  );
};

export default SonographyTest;
