import React, { useState } from "react";
import "../assets/css/LoginForm.css"; // Import the CSS module
import { useParams, useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  async function verifyOtpHandler() {
    const data = await fetch(`http://localhost:1234/users/verifyotp/${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp: otp,
      }),
    });
    const res = await data.json();
    if (res.isOk) {
      setSuccess(res.message);
      setOtp(null)
      setTimeout(() => {
        navigate(`/resetnewpassword/${email}`);
      }, 2000);
    } else {
      setError(res.message);
    }
  }
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-5 d-flex justify-content-center">
          <div className="login-box">
            <p>Verify OTP</p>
            <form>
              {success ? <p style={{ color: "green" }}>{success}</p> : null}
              <div className="user-box">
                <input
                  required=""
                  name=""
                  type="number"
                  onChange={(e) => {
                    setError(null);
                    setOtp(e.target.value);
                    setSuccess(null);
                  }}
                />
                <label>Enter 5 digit OTP</label>
              </div>
              {error ? <p style={{ color: "red" }}>{error}</p> : null}
              <a onClick={verifyOtpHandler}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Verify Otp
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
