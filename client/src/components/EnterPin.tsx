import { useState, useRef, useEffect } from 'react';
import navigateIcon from '../assets/exisitng-card/navigate.svg';

export default function EnterPin() {
    const [pin, setPin] = useState<string[]>(Array(5).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Focus the first input on component mount
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index: number, value: string) => {
        if (/^\d*$/.test(value)) { // Only allow digits
            const newPin = [...pin];
            newPin[index] = value;
            setPin(newPin);

            // Auto-focus next input if a digit was entered
            if (value && index < pin.length - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !pin[index] && index > 0) {
            // Move focus to previous input on backspace if current is empty
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = () => {
        if (pin.every(digit => digit !== '')) {
            // Handle PIN submission
            console.log('Submitted PIN:', pin.join(''));
        }
    };

    return (
        <div className="relative w-full font-sora">
             <img 
                src={navigateIcon} 
                alt="Navigate" 
                className="absolute top-5 left-5 cursor-pointer"
            />
            <div className="flex flex-col items-center gap-6 px-4">
                <div className="text-center mt-16">
                    <h1 className="text-2xl font-semibold mb-2">Enter Your Pin</h1>
                    <p className="text-sm text-[#666]">To get started with Tangent, enter your Tangent pin</p>
                </div>

                <div className="flex gap-3 mt-4">
                    {pin.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => { inputRefs.current[index] = el }}
                            type="password"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-10 h-10 rounded-xl border border-gray-300 text-center text-lg focus:border-gray-500 focus:outline-none"
                            autoFocus={index === 0}
                        />
                    ))}
                </div>

                {/* Submit button */}
                <button 
                    className={`mt-12 h-14 rounded-xl text-base font-medium hover:bg-gray-200 w-full max-w-xs ${
                        pin.every(digit => digit !== '') 
                            ? 'bg-gray-800 text-white hover:bg-gray-700' 
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={handleSubmit}
                    disabled={!pin.every(digit => digit !== '')}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}