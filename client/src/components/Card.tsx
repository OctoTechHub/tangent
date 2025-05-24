import React from "react";
// import chipIcon from "../assets/exisitng-card/card.svg";
import logoIcon from "../assets/Onboarding/Logo.svg";
import nfcIcon from "../assets/exisitng-card/logo.svg";

interface CardProps {
  name: string;
  number: string;
  alignment?: "vertical" | "horizontal" | "slanting";
}

const Card: React.FC<CardProps> = ({
  name,
  number,
  alignment = "vertical",
}) => {
  return (
    <div className="relative w-[510px] h-[310px] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-[#1A2237] via-[#2B3A55] to-[#0F1620] text-white p-6 flex flex-col justify-between">
      {/* Top Left - Branding and Chip */}
      <div className="flex flex-col gap-2">
        <p
          className="text-2xl font-semibold"
          style={{ fontFamily: "Bruno-Ace" }}
        >
          Tangent
        </p>
        <div className="w-10 h-6 bg-gray-400 rounded" />
        <p
          className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#E0E0E0] via-white to-[#B0BEC5] tracking-widest"
          style={{ fontFamily: "Bruno-Ace" }}
        >
          {number}
        </p>
      </div>

      {/* Bottom Row - Name and Logo */}
      <div className="flex items-center justify-between z-10">
        <p className="text-lg font-medium" style={{ fontFamily: "Sora" }}>
          {name}
        </p>
        <img src={logoIcon} alt="Logo" className="w-10 h-10 object-contain" />
      </div>

      {/* NFC Icon */}
      <img className="absolute top-4 right-4 w-6 h-6" src={nfcIcon} alt="NFC" />
    </div>
  );
};

export default Card;
