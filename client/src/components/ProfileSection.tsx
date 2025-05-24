import navigateIcon from '../assets/exisitng-card/navigate.svg';
import logo from '../assets/exisitng-card/image.png';
import Button from './Button';
import { useState } from 'react';

export default function ProfileSection(){
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        gender: '',
        tangentId: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
    };

    return(
        <div className="relative w-full font-sora">
            <img 
                src={navigateIcon}
                alt="Navigate"
                className="absolute top-5 left-5 cursor-pointer"
            />
            <div className="flex flex-col items-center mt-14 gap-4">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold mb-2">Welcome!</h1>
                    <p className="text-md font-semibold text-[#666]">Confirm your details to continue.</p>
                </div>
                <img src={logo} alt="Logo" className="max-w-[150px] mx-auto mt-4" />
                
                <form onSubmit={handleSubmit} className="w-full max-w-md px-4 mt-6">
                    <div className="space-y-4">
                        <div>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-gray-500"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-gray-500"
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-gray-500"
                            />
                        </div>
                        <div>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-gray-500"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="country"
                                placeholder="Country"
                                value={formData.country}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-gray-500"
                            />
                        </div>
                        <div>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-gray-500"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="tangentId"
                                placeholder="Tangent ID"
                                value={formData.tangentId}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-gray-500"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-gray-800 text-white py-3 rounded-xl hover:bg-gray-700 mt-6"
                        >
                            Continue
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}