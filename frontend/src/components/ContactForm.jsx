import React, { useState } from "react";
import "../assets/css/ContactForm.css";

const ContactForm = () => {
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [focused, setFocused] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleFocus = (e) => {
    setFocused({ ...focused, [e.target.name]: true });
  };

  const handleBlur = (e) => {
    if (inputValues[e.target.name]) {
      setFocused({ ...focused, [e.target.name]: true });
    }
  };

  return (
    <div className="container">
      {/* Information sections omitted for brevity */}

      <div className="form">
        {/* Contact information */}
        <div className="contact-info">
          <h3 className="title">Let's get in touch</h3>
          <p className="text">
            We value your feedback and inquiries. Feel free to reach out to us
            with any questions, comments, or collaborations. We're here to
            assist you!
          </p>

          {/* More information here */}

          <div className="social-media">
            <p>Connect with us :</p>
            <div className="social-icons">
              <a href="#">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="contact-form">
          <form autoComplete="off">
            <h3 className="title">Contact us</h3>

            {/* Username */}
            <div
              className={`input-container ${
                focused.name || inputValues.name ? "focus" : ""
              }`}
            >
              <input
                type="text"
                name="name"
                className="input"
                value={inputValues.name}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <label>Username</label>
              <span>Username</span>
            </div>

            {/* Email */}
            <div
              className={`input-container ${
                focused.email || inputValues.email ? "focus" : ""
              }`}
            >
              <input
                type="email"
                name="email"
                className="input"
                value={inputValues.email}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <label>Email</label>
              <span>Email</span>
            </div>

            {/* Phone */}
            <div
              className={`input-container ${
                focused.phone || inputValues.phone ? "focus" : ""
              }`}
            >
              <input
                type="tel"
                name="phone"
                className="input"
                value={inputValues.phone}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <label>Phone</label>
              <span>Phone</span>
            </div>

            {/* Message */}
            <div
              className={`input-container textarea ${
                focused.message || inputValues.message ? "focus" : ""
              }`}
            >
              <textarea
                name="message"
                className="input"
                value={inputValues.message}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              ></textarea>
              <label>Message</label>
              <span>Message</span>
            </div>

            <input type="submit" value="Send" className="btn" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
