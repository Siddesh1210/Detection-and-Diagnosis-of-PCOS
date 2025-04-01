import React from "react";
import HomePage from "./pages/HomePage";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PCOSText from "./pages/PCOSText";
import SentOtp from "./pages/SentOtp";
import VerifyOtp from "./pages/VerifyOtp";
import ConfirmPassword from "./pages/ConfirmPassword";
import AdvancePcosForm from "./pages/AdvancePcosForm";
import SonographyTest from "./pages/SonographyTest";
import BMICalculator from "./pages/BMICalculator";
import PeriodTracker from "./components/PeriodTracker";
import DietPage from "./pages/DietPage";
import Yoga from "./pages/Yoga";
import DoctorList from "./pages/DoctorList";
import ScrollToTop from "./components/ScrollToTop";
import CheckLogin from "./components/CheckLogin";

const App = () => {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </>
  );
};

const appLayout = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/detect-pcos-by-text",
        element: <PCOSText />,
      },
      {
        path: "/advance-pcos-test",
        element: <AdvancePcosForm />,
      },
      {
        path: "/sonography-test",
        element: <SonographyTest />,
      },
      {
        path: "/calculate-bmi",
        element: <BMICalculator />,
      },
      {
        path: "/sentotp",
        element: <SentOtp />,
      },
      {
        path: "/period-tracker",
        element: <PeriodTracker />,
      },
      {
        path: "/verifyotp/:email",
        element: <VerifyOtp />,
      },
      {
        path: "/diet-plan",
        element: <DietPage />,
      },
      {
        path: "/yoga-plan",
        element: <Yoga />,
      },
      {
        path: "/doctor-list",
        element: <DoctorList />,
      },
      {
        path: "/resetnewpassword/:email",
        element: <ConfirmPassword />,
      },
    ],
  },
]);

export default appLayout;
