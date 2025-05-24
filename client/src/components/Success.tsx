import React from 'react';
import successIcon from '../assets/Onboarding/success.svg';
import Button from './Button';
import confetti from "../assets/new-card/Animation 1748078611003.json";
import { Player } from "@lottiefiles/react-lottie-player";

const Success = ({ title, message, next }:{ title: string, message: string, next: string }) => {
  return (
    <div className="min-h-screen flex flex-col  items-center justify-center bg-[#F5F5F5] px-4">
      <div className="flex flex-col items-center w-full max-w-xs mx-auto">
        <div className="relative flex flex-col items-center">
          {/* Confetti Animation - larger */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 z-0 w-96 h-56 pointer-events-none">
            <Player autoplay loop src={confetti} style={{ width: '100%', height: '100%' }} />
          </div>
          {/* Success Tick - smaller */}
          <img src={successIcon} alt="Success" className="w-24 h-24 mb-4 z-10" />
        </div>
        <h1 className="text-2xl font-bold text-center mt-2 mb-1" style={{fontFamily:"Sora"}}>{title}</h1>
        <p className="text-gray-600 text-center mb-8 max-w-xs" style={{fontFamily:"Inter"}}>{message}</p>
        <Button onClick={() => window.location.href = next}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Success;