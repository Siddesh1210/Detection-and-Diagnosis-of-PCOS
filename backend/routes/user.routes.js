import express from "express";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import auth from "../middlewares/aut.middleware.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
const route = express.Router();
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "siddeshjaiswal12@gmail.com",
    // pass: "qbslzxzsqwrjcimo",
    pass: process.env.EMAIL_PASSWORD,
  },
});

route.get("/", (req, res) => {
  res.send("User Route is working");
});

route.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(401)
      .json({ isOk: false, message: "All fields are required" });
  }
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    return res
      .status(401)
      .json({ isOk: false, message: "User already exist", isUserExist });
  }
  const user = await User.create({ username, email, password });
  if (!user) {
    return res.status(401).json({ isOk: false, message: "User not created" });
  }
  return res
    .status(201)
    .json({ isOk: true, message: "User created successfully" });
});

route.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(401)
      .json({ isOk: false, message: "All fields are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(401)
      .json({ isOk: false, message: "This email does not exist" });
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res
      .status(401)
      .json({ isOk: false, message: "Password is incorrect" });
  }
  const access_token = jwt.sign({ id: user._id }, process.env.Access_Token, {
    expiresIn: "5d",
  });
  const refresh_token = jwt.sign({ id: user._id }, process.env.Refresh_Token, {
    expiresIn: "10d",
  });
  user.refreshToken = refresh_token;
  user.accessToken = access_token;
  await user.save();
  res.cookie("access_token", access_token);
  res.cookie("refresh_token", refresh_token);
  return res.status(200).json({
    isOk: true,
    message: "User logged in successfully",
    access_token,
    refresh_token,
  });
});

route.get("/service", auth, (req, res) => {
  res.send("Service Route is working");
});

route.post("/sendotp/:email", async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(404)
      .json({ isOk: false, message: "User not found with this email" });
  }
  try {
    const otp = Math.floor(Math.random() * 100000);
    const mailOptions = {
      from: "siddeshjaiswal12@gmail.com",
      to: email,
      subject: "One Time Password for Resetting Password",
      text: `Your OTP is ${otp}`,
    };
    transporter.sendMail(mailOptions, async (err, info) => {
      if (err)
        return res.status(500).json({ isOk: false, message: "OTP not sent" });
      user.otp = otp;
      await user.save();
      return res
        .status(200)
        .json({ isOk: true, message: "OTP sent successfully" });
    });
  } catch (error) {
    res.status(500).json({ isOk: false, message: error.message });
  }
});

route.post("/verifyotp/:email", async (req, res) => {
  const { email } = req.params;
  const { otp } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(404)
      .json({ isOk: false, message: "Cannot find user with this email" });
  }
  if (user.otp == otp) {
    user.otp = null;
    await user.save();
    return res
      .status(200)
      .json({ isOk: true, message: "otp verified successfully" });
  }
  return res
    .status(404)
    .json({ isOk: false, message: "OTP verification is invalid" });
})

//Verify and reset password
route.post("/resetpassword/:email", async (req, res) => {
  const { email } = req.params;
  const { password } = req.body;
  if (!email || !password) {
    return res
      .status(401)
      .json({ isOk: false, message: "All fields are required" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(404)
      .json({ isOk: false, message: "Cannot find user with this email" });
  }
  user.password = password;
  await user.save();
  return res
    .status(200)
    .json({ isOk: true, message: "Password reset successfully" });
});

route.get("/logout", (req, res) => {
    // Clear cookies containing the access token and refresh token
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.status(200).json({ isOk: true, message: "User logged out successfully" });
  });

route.get("/checklogin",auth,(req,res)=>{
    return res.status(200).json({ isOk: true, message: "User is Logged In" });
})

  
export default route;
