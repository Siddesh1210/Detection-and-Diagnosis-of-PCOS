import React, { useState } from "react";
import "../assets/css/LoginForm.css"; // Import the CSS module
import { Link,useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [buttonData,setButtonData]=useState("Login")
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  async function loginHandler() {
    setButtonData("Login...")
    const response = await fetch("http://localhost:1234/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
    const result = await response.json();
    setButtonData("Login")
    if (result.isOk) {
      setSuccess(result.message);
      localStorage.setItem('access_token', result.access_token);
    //   localStorage.setItem('userData', JSON.stringify(result.isOk));
      setError(null);
      setTimeout(()=>{
        navigate("/")
    },1000)
    } else {
      setError(result.message);
      setSuccess(null);
    }
  }
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-5 d-flex justify-content-center">
          <div className="login-box">
            <p>Login</p>
            <form>
              {success ? <p style={{ color: "green" }}>{success}</p> : null}
              <div className="user-box">
                <input
                  required=""
                  name=""
                  type="email"
                  value={data.email}
                  onChange={(e) => {
                    setData({ ...data, email: e.target.value });
                    setSuccess(null);
                    setError(null);
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
              <a onClick={loginHandler}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                {buttonData}
              </a>
            </form>
            <div style={{ textAlign: "center" }}>
              <Link to="/sentotp" className="forgetPassword">
                Forget Password?
              </Link>
            </div>
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

export default LoginPage;
