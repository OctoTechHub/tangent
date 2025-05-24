import React from "react";
import logo from "../../assets/Onboarding/Logo.svg";
import backdrop from "../../assets/Onboarding/backdrop.jpg";

const Onboarding = () => {
  return (
    <div
      className="h-screen w-full bg-black bg-center bg-cover flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${backdrop})` }}
    >
      <img src={logo} alt="Logo" className="w-32 h-32 object-contain" />
      <h1 className="mt-4 text-white text-2xl font-bold tracking-widest " style={{fontFamily: 'Bruno-Ace'}}>TANGENT</h1>
    </div>
  );
};

export default Onboarding;
