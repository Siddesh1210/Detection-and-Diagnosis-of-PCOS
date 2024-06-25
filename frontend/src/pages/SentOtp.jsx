import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/css/LoginForm.css"; // Import the CSS module

const SentOtp = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  async function sentOtpHandler() {
    if (!email.includes("@")) {
      setEmail(email);
      setError("Please enter a valid email");
      return;
    }
    const result = await fetch(`http://localhost:1234/users/sendotp/${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    if (data.isOk) {
      setSuccess(data.message);
      setTimeout(()=>{
        navigate(`/verifyotp/${email}`);
      },2000)
    } else {
      setError(data.message);
    }
  }
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-5 d-flex justify-content-center">
          <div className="login-box">
            <p>Reset Password</p>
            <form>
              {success ? <p style={{ color: "green" }}>{success}</p> : null}
              <div className="user-box">
                <input
                  required=""
                  name=""
                  type="email"
                  onChange={(e) => {
                    setError(null);
                    setEmail(e.target.value);
                  }}
                />
                <label>Email</label>
              </div>
              {error ? <p style={{ color: "red" }}>{error}</p> : null}
              <a onClick={sentOtpHandler}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Sent Otp
              </a>
            </form>
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="a2">
                Register!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentOtp;
