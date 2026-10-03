import type {IBlock} from "@/types/blocksDataTypes";
import Image from "next/image";
import MyPhoto from "../assets/hero/my-photo.png";
import MyPhotoMobile from "../assets/hero/mobileHero.png";
import Ellipse from "../assets/hero/ellipse.png";

interface HeroProps {
    hero: IBlock;
}

const Hero = ({hero}: HeroProps) => {
    const {text, title, subtitle} = hero;

    return (
        <section
            className="relative isolate grid w-full grid-cols-1 items-center gap-8 overflow-hidden px-4 pb-14 pt-10 ipad:min-h-[600px] ipad:grid-cols-[minmax(0,1fr)_minmax(300px,42vw)_minmax(0,1fr)] ipad:gap-3 ipad:px-14 laptop:min-h-[650px] desk:px-20 wide:min-h-[900px] wide:px-65"
            aria-labelledby="hero-heading"
        >
            <div className="z-20 text-center ipad:text-left">
                <h1
                    id="hero-heading"
                    className="font-cinzel text-[42px] font-bold leading-[1.25] text-gold-primary animate-slide-in-left mobile:text-[64px] ipad:text-[44px] laptop:text-5xl desk:text-7xl"
                >
                    Greetings, I am Max
                </h1>
                <span className="sr-only">Maksym Aksamitnyi Максім Аксамітний Максим Аксамитный</span>
            </div>

            <div className="relative z-10 mx-auto flex w-full max-w-[635px] items-end justify-center self-end">
                <Image
                    src={Ellipse}
                    alt=""
                    aria-hidden="true"
                    sizes="(max-width: 833px) 90vw, (max-width: 1193px) 42vw, (max-width: 1919px) 38vw, 657px"
                    className="absolute bottom-0 left-1/2 -z-10 h-auto w-[110%] max-w-none -translate-x-1/2"
                />
                <Image
                    src={MyPhoto}
                    alt="Maksym Aksamitnyi, full-stack developer"
                    priority
                    sizes="(max-width: 833px) 0px, (max-width: 1193px) 42vw, (max-width: 1919px) 38vw, 657px"
                    className="hidden h-auto w-full animate-fade ipad:block"
                />
                <Image
                    src={MyPhotoMobile}
                    alt="Maksym Aksamitnyi, full-stack developer"
                    priority
                    sizes="(max-width: 583px) 90vw, (max-width: 833px) 635px, 0px"
                    className="h-auto w-full animate-fade ipad:hidden"
                />
            </div>

            <div className="z-20 flex flex-col items-center text-center font-cinzel animate-slide-in-right ipad:items-end ipad:text-right">
                <p className="mb-4 text-xs ipad:text-sm laptop:text-lg">{subtitle}</p>
                <h2 className="text-lg font-bold mobile:text-xl ipad:text-lg laptop:text-xl desk:text-2xl">
                    {title}
                </h2>
                <p className="mt-4 max-w-[424px] text-4xs mobile:text-2xs ipad:text-4xs laptop:text-2xs">
                    {text}
                </p>
            </div>
        </section>
    );
};

export default Hero;
