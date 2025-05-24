import logo1 from '../assets/exisitng-card/logo1.svg';
import navigateIcon from '../assets/exisitng-card/navigate.svg';

export default function ProfileSection(){
    return(
        <div className="relative w-full font-sora">
            <img 
                src={navigateIcon}
                alt="Navigate"
                className="absolute top-5 left-5 cursor-pointer"
            />
            <div className="flex flex-col items-center gap-4">
                <img src={logo1} alt="Logo" className="max-w-[200px]" />
                <div className="text-center">
                    <h1 className="text-2xl font-semibold mb-2">Welcome!</h1>
                    <p className="text-sm text-[#666]">Confirm your details to continue.</p>
                </div>
            </div>
        </div>
    )
}