// import React from "react";
import logo from "../assets/Onboarding/Logo.svg";
import backdrop from "../assets/Onboarding/backdrop.jpg";

const Onboarding = () => {
  return (
    <div
      className="h-screen w-full bg-black bg-center bg-cover flex items-center justify-center"
      style={{ backgroundImage: `url(${backdrop})` }}
    >
        <img src={logo} alt="Logo" className="w-32 h-32 object-contain" />
        
    </div>
  );
};

export default Onboarding;
