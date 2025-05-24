import navigateIcon from "../assets/exisitng-card/navigate.svg";
import newCard from "../assets/new-card/Tangent Group 176743.png";
import React, { useState } from "react";
import Button from "./Button";

const categories = ["Student", "Professional", "Entrepreneur", "Other"];

export default function Onboarding() {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add validation and submission logic
  };

  const inputClass =
    "w-full py-3 px-4 rounded-lg border border-gray-200 text-base bg-[#F8FAFF] outline-none shadow-sm focus:ring-2 focus:ring-[#1976D2] transition-all";

  return (
    <div className="relative w-full min-h-screen font-sora bg-[#F5F5F5] flex flex-col items-center justify-center px-2">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xs sm:max-w-sm bg-white rounded-3xl px-6 py-4 shadow-lg flex flex-col gap-3 mx-auto relative"
      >
        <div className="absolute top-4 left-4 flex items-center gap-2 cursor-pointer justify-center">
          <img src={navigateIcon} alt="Navigate" className="w-10 h-10" />
          <span className="text-sm font-medium text-gray-700">
            Create your card
          </span>
        </div>

        <div className="flex flex-col items-center mt-5">
          <img src={newCard} alt="Logo" className="h-20 w-20 object-contain" />
          <h2 className="m-0 font-bold text-lg text-center">
            Welcome to the Family!
          </h2>
          <p className="m-0 text-gray-600 text-xs text-center">
            Fill in the details to make your own Tangent card & get started.
          </p>
        </div>

        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className={inputClass}
          required
        />
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          className={inputClass}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          required
        />
        <div className="flex items-center gap-2">
          <span className="text-xl">🇮🇳</span>
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`${inputClass} flex-1`}
            required
          />
        </div>
        <input
          type="password"
          placeholder="Create a PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className={inputClass}
          required
        />
        <input
          type="password"
          placeholder="Confirm PIN"
          value={confirmPin}
          onChange={(e) => setConfirmPin(e.target.value)}
          className={inputClass}
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={inputClass}
          required
        >
          <option value="" disabled>
            Choose your Category
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <Button onClick={() => {}}>
            Continue
        </Button>
      </form>
    </div>
  );
}
