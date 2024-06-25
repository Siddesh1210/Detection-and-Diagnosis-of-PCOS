import React, { useState } from "react";
import "../assets/css/LoginForm.css"; // Import the CSS module
import { useParams, useNavigate } from "react-router-dom";

const ConfirmPassword = () => {
  const { email } = useParams();
  const [password, setPassword] = useState(null);
  const [cpassword, setCPassword] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  async function resetPasswordHandler() {
    if (cpassword != password) {
      setError("Passwords do not match");
      return;
    }
    setError(null);
    const data = await fetch(
      `http://localhost:1234/users/resetpassword/${email}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
        }),
      }
    );
    const result = await data.json();
    if (result.isOk) {
      setSuccess(result.message);
      setPassword(null);
      setCPassword(null);
      setTimeout(()=>{
        navigate("/login");
      },2000)
    } else {
      setError(result.message);
    }
  }
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-5 d-flex justify-content-center">
          <div className="login-box">
            <p>Reset New Password</p>
            <form>
              {success ? <p style={{ color: "green" }}>{success}</p> : null}
              <div className="user-box">
                <input
                  required=""
                  name=""
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setSuccess(null);
                    setError(null);
                  }}
                />
                <label>Password</label>
              </div>
              <div className="user-box">
                <input
                  required=""
                  name=""
                  type="password"
                  onChange={(e) => {
                    setCPassword(e.target.value);
                    setError(null);
                    setSuccess(null);
                  }}
                />
                <label>Confirm Password</label>
              </div>
              {error ? <p style={{ color: "red" }}>{error}</p> : null}
              <a onClick={resetPasswordHandler}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Reset Password
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPassword;
