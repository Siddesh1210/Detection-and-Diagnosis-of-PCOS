import React from "react";
import "../assets/css/HomePage.css";
const Symptoms = () => {
  return (
    <div className="container-fluid my-5">
      <div className="row justify-content-center">
        <div className="col-md-10 text-center symptoms">
          <h2>Causes and Symptoms</h2>
          <p>
            Genetics and family history play an vital role.
          </p>
        </div>
        <div className="row box">
          <div className="col-md-3 p-3 text-center">
            <h3>95%<br></br>Hormone Level</h3>
          </div>
          <div className="col-md-3 p-3 text-center">
          <h3>90%<br></br>Stress Level</h3>
          </div>
          <div className="col-md-3 p-3 text-center">
          <h3>80%<br></br>Weight & Lifestyle</h3>
          </div>
          <div className="col-md-3 p-3 text-center">
          <h3>95%<br></br>Family History</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Symptoms;
