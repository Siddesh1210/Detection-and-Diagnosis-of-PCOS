import React, { useState } from "react";
import "../assets/css/DetectPCOS.css";
import { Link } from "react-router-dom";

const DetectPCOS = () => {
  // State to manage which section to display
  const [currentView, setCurrentView] = useState("proneToPCOS");

  // Handler to change the current view
  const changeView = (view) => {
    setCurrentView(view);
  };
  // Function to render content based on the current view
  const renderContent = () => {
    switch (currentView) {
      case "proneToPCOS":
        return <DetectPCOSContent />;
      case "lifestyleSuggestion":
        return <PlannerContent />;
      case "gynoConsultation":
        return <GynoListContent />;
      default:
        return <div>Select an option above</div>;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center detect">
        <div className="col-md-6 text-center">
          <h3>Let's Detect and Diagnosis PCOS</h3>
        </div>
      </div>

      {/* Buttons to Navigate */}
      <div className="row justify-content-around my-3">
        <div className="col-md-3">
          <button className="fancy" onClick={() => changeView("proneToPCOS")}>
            <span className="top-key"></span>
            <span className="text">Prone to PCOS</span>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
          </button>
        </div>
        <div className="col-md-3">
          <button
            className="fancy"
            onClick={() => changeView("lifestyleSuggestion")}
          >
            <span className="top-key"></span>
            <span className="text">Lifestyle Suggestion</span>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
          </button>
        </div>
        <div className="col-md-3">
          <button
            className="fancy"
            onClick={() => changeView("gynoConsultation")}
          >
            <span className="top-key"></span>
            <span className="text">Gyno Consultation</span>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
          </button>
        </div>
      </div>

      {/* Dynamic Content Based on Selection */}
      <div className="row justify-content-center my-3">{renderContent()}</div>
    </div>
  );
};

// Components for each view
const DetectPCOSContent = () => (
  // Add your Detect PCOS related components or JSX here
  <div className="row justify-content-center my-3 detect">
    <div className="col-md-3 d-flex justify-content-center align-items-center">
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <p className="titlic">Detect</p>
            <p>PCOS By Text</p>
          </div>
          <div className="flip-card-back">
            <p className="titlic">Let's Test</p>
            <Link to="/detect-pcos-by-text">
              <button>Test</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center">
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <p className="titlic">Detect</p>
            <p>PCOS by Sonography</p>
          </div>
          <div className="flip-card-back">
            <p className="titlic">Let's Test</p>
            <Link to="/sonography-test">
              <button>Test</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center">
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <p className="titlic">Track</p>
            <p>Period Tracker</p>
          </div>
          <div className="flip-card-back">
            <p className="titlic">Let's Track</p>
            <Link to="/period-tracker">
              <button>Track</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PlannerContent = () => (
  <div className="row justify-content-center my-3 ">
    <div className="col-md-3 d-flex justify-content-center align-items-center">
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <p className="titlic">Plan</p>
            <p>Yoga Planner</p>
          </div>
          <div className="flip-card-back">
            <p className="titlic">Let's Plan</p>
            <Link to="/yoga-plan"><button>Get Plan</button></Link>
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center">
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <p className="titlic">Plan</p>
            <p>Diet Planner</p>
          </div>
          <div className="flip-card-back">
            <p className="titlic">Let's Plan</p>
            <Link to="/diet-plan"><button>Get Plan</button></Link>
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-3 d-flex justify-content-center align-items-center">
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <p className="titlic">Calculate</p>
            <p>BMI Calculator</p>
          </div>
          <div className="flip-card-back">
            <p className="titlic">Let's Calculate</p>
            <Link to="/calculate-bmi">
              <button>Calculate</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const GynoListContent = () => (
  <div className="row justify-content-center my-3">
    <div className="col-md-3 d-flex justify-content-center align-items-center">
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <p className="titlic">Consult</p>
            <p>Gyno Consultation</p>
          </div>
          <div className="flip-card-back">
            <p className="titlic">Let's Consult</p>
            <Link to="/doctor-list"><button>Check List</button></Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DetectPCOS;
