import React, { useState } from 'react';
import starbackground from '../../assets/Onboarding/starbackground.png';
import wallet from '../../assets/Onboarding/wallet.svg';
import coin from "../../assets/Onboarding/coin.svg";
import dollarbox from "../../assets/Onboarding/dollarbox.svg";
import { IoArrowBack } from 'react-icons/io5'; // Import the back icon from react-icons

const tabs = [
  {
    title: "Your Identity,\nOne Tap Away.",
    image: wallet,
    description: "Access your profile, wallet, and achievements instantly. Your card is your key to a smarter experience."
  },
  {
    title: "Tap It Own It \n Evolve Digitally.",
    image: wallet,
    description: "Start your journey into seamless digital ownership — from identity to payments, all in one smart card."
  },
  {
    title: "Where cards \nPower Your Wallet.",
    image: dollarbox, // You can swap this with another image if needed
    description: "Effortlessly manage funds, credentials, and rewards — all through your NFC card-enabled wallet"
  }
];

const InfoScreen = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleNext = () => {
    if (currentTab < tabs.length - 1) {
      setCurrentTab((prev) => prev + 1);
    }
    // Else: trigger navigation if needed
  };

  const handleBack = () => {
    if (currentTab > 0) {
      setCurrentTab((prev) => prev - 1);
    }
    // Else: trigger navigation if needed
  };

  return (
    <div
      className="h-screen w-full bg-center bg-cover flex flex-col justify-between items-center px-6 py-10 text-center"
      style={{ backgroundImage: `url(${starbackground})` }}
    >
      {/* Back Icon and Progress Timeline */}
      <div className="w-full flex items-center justify-between">
      <button
  onClick={handleBack}
  className="text-2xl bg-white rounded-full w-12 h-12 flex items-center justify-center"
  style={{ color: '#020B14' }}
>
  <IoArrowBack />
</button>
        <div className="flex items-center justify-center space-x-3">
          {tabs.map((_, index) => (
            <div
              key={index}
              className={`w-8 h-2 rounded-full ${
                index === currentTab
                  ? 'bg-white/90'
                  : 'border border-white/40'
              }`}
            />
          ))}
        </div>
        <div className="w-8"></div> {/* Spacer to balance the back button */}
      </div>

      {/* Title */}
      <div className="mt-6">
        <div className="w-full px-6 max-w-xs text-center mb-6">
          <h1 className="text-white text-3xl font-bold leading-snug whitespace-pre-line">
            {tabs[currentTab].title}
          </h1>
        </div>
      </div>

      {/* Image */}
      <img
        src={tabs[currentTab].image}
        alt="Onboarding Visual"
        className={`object-contain mt-[-10%] ${currentTab === 1 ? 'w-full h-88' : 'w-88 h-88'}`}
      />

      {/* Description */}
      <p
        className="text-white text-sm leading-relaxed max-w-xs mb-6 mt-[-10%]"
        style={{ fontFamily: 'Sora' }}
      >
        {tabs[currentTab].description}
      </p>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="w-72 bg-gradient-to-b from-[#E6F0FF] to-[#CCE0FF] text-black text-base font-semibold rounded-full py-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm border border-white/20"
      >
        {currentTab === tabs.length - 1 ? 'Continue' : 'Next'}
      </button>
    </div>
  );
};

export default InfoScreen;
