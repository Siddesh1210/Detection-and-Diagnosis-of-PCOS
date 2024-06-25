// LoginPage.js

import React from "react";
import "../assets/css/LoginForm.css"; // Import the CSS module
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";

const RegisterPage = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate=useNavigate();
  async function registerHandle()
  {
    const response = await fetch("http://localhost:1234/users/register",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    const result = await response.json();
    if(result.isOk)
    {
        setSuccess(result.message);
        setError(null)
        setTimeout(()=>{
            navigate("/")
        },1000)
    }
    else
    {
        setError(result.message);
        setSuccess(null)
    }
  }
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-5 d-flex justify-content-center">
          <div className="login-box">
            <p>Register</p>
            <form>
              {success ? <p style={{ color: "green" }}>{success}</p> : null}
              <div className="user-box">
                <input
                  required=""
                  name=""
                  type="text"
                  value={data.username}
                  onChange={(e) => {
                    setData({ ...data, username: e.target.value });
                    setError(null);
                    setSuccess(null);
                  }}
                />
                <label>Username</label>
              </div>
              <div className="user-box">
                <input
                  required=""
                  name=""
                  type="email"
                  value={data.email}
                  onChange={(e) => {
                    setData({ ...data, email: e.target.value });
                    setError(null);
                    setSuccess(null);
                  }}
                />
                <label>Email</label>
              </div>
              <div className="user-box">
                <input
                  required=""
                  name=""
                  type="password"
                  value={data.password}
                  onChange={(e) => {
                    setData({ ...data, password: e.target.value });
                    setError(null);
                    setSuccess(null);
                  }}
                />
                <label>Password</label>
              </div>
              {error ? <p style={{ color: "red" }}>{error}</p> : null}
              <a onClick={registerHandle}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Register
              </a>
            </form>
            <p>
              Already has an account?{" "}
              <Link to="/login" className="a2">
                Login!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
