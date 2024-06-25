import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DoctorList = () => {
  const [doctorList, setDoctorList] = useState(null);
  const [allDoctor, setAllDoctor] = useState(null);
  const [doctorCity, setDoctorCity] = useState(null);
  async function getDoctorList() {
    const result = await fetch("http://localhost:1234/pcos-test/doctors", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await result.json();
    setDoctorList(response.doctors);
    setAllDoctor(response.doctors);
    // console.log(response.doctors);
  }

  useEffect(() => {
    getDoctorList();
  }, []);

  useEffect(() => {
    if (allDoctor != null) {
      setDoctorList(
        allDoctor.filter((doctor) => {
          if (doctor.location == doctorCity) {
            return doctor;
          }
        })
      );
    }
  }, [doctorCity]);

  const handleCityChange = (event) => {
    console.log(event.target.value);
    setDoctorCity(event.target.value);
    // console.log(doctorCity);
  };
  return (
    <div className="container-fluid">
      <div className="row justify-content-center my-3">
        <div className="col-md-11">
          <h2>Preparing for your appointment</h2>
          <p className="text-start" style={{ fontSize: "18px" }}>
            For PCOS, you may see a specialist in female reproductive medicine
            (gynecologist), a specialist in hormone disorders (endocrinologist)
            or an infertility specialist (reproductive endocrinologist).
            <br></br>
            Here's some information to help you get ready for your appointment.
          </p>
          <p>
            <span className="fw-bold fs-4">What you can do</span>
            <br></br><span>Before your appointment, make a list of:</span>
            <ul style={{fontSize:"18px"}}>
              <li>Symptoms you've been having, and for how long.</li>
              <li>
                Information about your periods, including how often they occur,
                how long they last and how heavy they are.
              </li>
              <li>
                All medications, vitamins, herbs and other supplements you take,
                including the dosages
              </li>
              <li>
                Key personal and medical information, including other health
                conditions recent life changes and stressors
              </li>
            </ul>
          </p>
        </div>
      </div>
      <div className="row justify-content-center my-3">
        <div className="col-md-5">
          <p className="text-center fw-bold px-5 py-2 fs-4">
            Select your City Preference :{" "}
          </p>
          <select
            className="form-select"
            aria-label="Default select example"
            value={doctorCity}
            onChange={handleCityChange}
          >
            <option disabled>Select your city</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Banglore">Banglore</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Delhi">Delhi</option>
          </select>
        </div>
      </div>
      {doctorList &&
        doctorList.map((doctor,index) => (
          <div className="row justify-content-center align-items-center my-3" key={index}>
            <div className="col-md-3">
              <img
                src={doctor.img}
                style={{ width: "100%", height: "100%", borderRadius: "12px" }}
              />
            </div>
            <div
              className="col-md-4 border p-4"
              style={{ borderRadius: "12px" }}
            >
              <h2>{doctor.name}</h2>
              <p style={{ color: "grey", letterSpacing: "2px" }}>
                {doctor.qualification}
              </p>
              <p>
                Experience : {doctor.experience} <br></br>Location :{" "}
                {doctor.location}
              </p>
              <p>Consultation Fee : {doctor.fees}</p>
              <Link to={doctor.link}>
                <button>Book Consultation</button>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default DoctorList;
