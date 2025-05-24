import React from "react";
import logoIcon from "../assets/Onboarding/Logo.svg";
import backdrop from "../assets/card-back.svg";

interface CardBackProps {
  name: string;
  number: string;
  issued: string;
  valid: string;
  type: string;
  alignment?: "vertical" | "horizontal" | "slanting" | "slanting2";
}

const CardBack: React.FC<CardBackProps> = ({
  name,
  number,
  issued,
  valid,
  type,
  alignment = "vertical",
}) => {
  const getTransform = () => {
    switch (alignment) {
      case "vertical":
        return "rotate(90deg)";
      case "slanting":
        return "rotate(-15deg)";
      case "slanting2":
        return "rotate(15deg)";
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
        borderRadius: "32px",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      }}
    >
      {/* Top Row: Logo and Card Type */}
      <div className="flex justify-between items-start w-full px-10 pt-8">
        <div className="flex items-center gap-2">
          <img src={logoIcon} alt="Logo" className="w-10 h-10 object-contain" />
          <span
            className="text-2xl font-semibold"
            style={{ fontFamily: "Isotok" }}
          >
            Profile
          </span>
        </div>
        <div
          className="bg-gradient-to-r from-[#B0BEC5] to-[#E0E0E0] px-6 py-2 rounded-br-2xl rounded-tl-3xl text-black font-bold tracking-widest text-base shadow-md"
          style={{ letterSpacing: "0.18em" }}
        >
          {type.toUpperCase()} CARD
        </div>
      </div>

      {/* Card Details */}
      <div className="flex flex-col gap-2 px-14 pt-8">
        <div className="mb-2">
          <span
            className="block text-lg tracking-widest mb-1"
            style={{ fontFamily: "Isotok", letterSpacing: "0.18em" }}
          >
            Name:
          </span>
          <span
            className="block text-2xl font-bold tracking-[0.25em] mb-4"
            style={{ fontFamily: "Isotok" }}
          >
            {name.toUpperCase()}
          </span>
        </div>

        <div className="mb-2">
          <span
            className="block text-lg tracking-widest mb-1"
            style={{ fontFamily: "Isotok", letterSpacing: "0.18em" }}
          >
            No:
          </span>
          <span
            className="block text-2xl font-bold tracking-[0.25em] mb-4"
            style={{ fontFamily: "Isotok" }}
          >
            {number}
          </span>
        </div>

        <div className="flex flex-row justify-between mt-8">
          <div>
            <span
              className="block text-lg tracking-widest mb-1"
              style={{ fontFamily: "Isotok", letterSpacing: "0.18em" }}
            >
              Issued:
            </span>
            <span
              className="block text-2xl tracking-[0.25em]"
              style={{ fontFamily: "Isotok" }}
            >
              {issued}
            </span>
          </div>

          <div className="text-right">
            <span
              className="block text-lg tracking-widest mb-1"
              style={{ fontFamily: "Isotok", letterSpacing: "0.18em" }}
            >
              Valid Thru
            </span>
            <span
              className="block text-2xl tracking-[0.25em]"
              style={{ fontFamily: "Isotok" }}
            >
              {valid}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBack;
