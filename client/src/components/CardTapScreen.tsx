import navigateIcon from '../assets/exisitng-card/navigate.svg';
import logoIcon from '../assets/exisitng-card/logo.svg';
import cardIcon from '../assets/exisitng-card/card.svg';
import shadowEllipse from '../assets/exisitng-card/Ellipse 2212.svg';

export default function CardTapScreen() {
    return (
        <div className="relative w-full font-sora ">
            <img 
                src={navigateIcon} 
                alt="Navigate" 
                className="absolute top-5 left-5 cursor-pointer"
            />
            <div className="flex flex-col  mb-7 items-center gap-5">
                <img src={logoIcon} alt="Logo" className="max-w-[200px]" />
                <div className="text-center">
                    <h2 className="mb-2.5 font-semibold text-2xl">Tap your Card to Begin</h2>
                    <p className="text-[#666] font-semibold text-sm">Hold the top of your phone near.</p>
                    <p className="text-[#666] font-semibold text-sm"> the Tangent Card to scan.</p>
                </div>
                <div className="relative flex justify-center">
                    <img src={shadowEllipse} alt="Shadow" className="absolute -bottom-5 z-[1]" />
                    <img src={cardIcon} alt="Card" className="relative z-[2]" />
                </div>
            </div>
        </div>
    )
}
