import React from "react";
import logoIcon from "../assets/Onboarding/Logo.svg";
import nfcIcon from "../assets/nfc.svg";
import chip from "../assets/chip.svg";
import backdrop from "../assets/card.svg";

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
  const getTransform = () => {
    switch (alignment) {
      case "vertical":
        return "rotate(90deg)";
      case "slanting":
        return "rotate(-15deg)";
      default:
        return "none";
    }
  };

  return (
    <div
      className="relative w-[600px] h-[400px] rounded-2xl overflow-hidden shadow-2xl text-white p-0 flex flex-col justify-between transition-transform duration-500 ease-in-out"
      style={{
        transform: getTransform(),
        backgroundImage: `url(${backdrop})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "24px",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      }}
    >
      {/* Tangent Top Left */}
      <p
        className="absolute left-10 top-10 text-4xl font-normal tracking-widest"
        style={{ fontFamily: "Bruno-Ace", letterSpacing: "0.12em" }}
      >
        TANGENT
      </p>

      {/* Chip + NFC */}
      <div className="absolute left-10 top-32 flex items-center gap-4">
        <img
          src={chip}
          alt="Chip"
          className="w-20 h-14 object-contain"
  
        />
        <img src={nfcIcon} alt="NFC" className="w-14 h-14 object-contain" />
      </div>

      {/* Card Number */}
      <p
        className="absolute left-10 bottom-24 text-3xl font-semibold tracking-widest"
        style={{ fontFamily: "Sora", letterSpacing: "0.1em" }}
      >
        {number}
      </p>

      {/* Name */}
      <p
        className="absolute left-10 bottom-14 text-xl font-semibold tracking-[0.25em]"
        style={{ fontFamily: "Sora", letterSpacing: "0.25em" }}
      >
        {name.toUpperCase()}
      </p>

      {/* Logo */}
      <img
        src={logoIcon}
        alt="Logo"
        className="absolute right-14 bottom-10 w-20 h-20 object-contain"
      />
    </div>
  );
};

export default Card;
