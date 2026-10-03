import Image from 'next/image';
import Button from '@/ui/Button';
import MyPhoto from '../assets/hero/my-photo.png';
import MyPhotoMobile from '../assets/hero/mobileHero.png';
import Ellipse from '../assets/hero/ellipse.png';
import {CV_URL} from '@/config/site';

const Hero = () => {
    return (
        <section
            className="relative isolate grid w-full grid-cols-1 items-center gap-8 overflow-hidden px-4 pb-14 pt-10 ipad:min-h-[650px] ipad:grid-cols-[minmax(0,1fr)_minmax(300px,40vw)_minmax(0,1fr)] ipad:gap-4 ipad:px-10 laptop:px-14 desk:px-20 wide:min-h-[900px] wide:px-65"
            aria-labelledby="hero-heading"
        >
            <div className="z-20 text-center animate-slide-in-left ipad:text-left">
                <p className="mb-3 font-taviraj text-4xs uppercase tracking-[2px] text-gold-500">
                    Full-stack developer portfolio
                </p>
                <h1
                    id="hero-heading"
                    className="font-cinzel text-[42px] font-bold leading-[1.15] text-gold-primary mobile:text-[58px] ipad:text-[38px] laptop:text-[48px] desk:text-[58px] wide:text-[72px]"
                >
                    Maksym Aksamitnyi
                </h1>
            </div>

            <div className="relative z-10 mx-auto flex w-full max-w-[635px] items-end justify-center self-end">
                <Image
                    src={Ellipse}
                    alt=""
                    aria-hidden="true"
                    sizes="(max-width: 833px) 90vw, (max-width: 1193px) 40vw, (max-width: 1919px) 36vw, 657px"
                    className="absolute bottom-0 left-1/2 -z-10 h-auto w-[110%] max-w-none -translate-x-1/2"
                />
                <picture className="block w-full animate-fade">
                    <source media="(max-width: 833px)" srcSet={MyPhotoMobile.src}/>
                    <Image
                        src={MyPhoto}
                        alt="Maksym Aksamitnyi, full-stack TypeScript developer"
                        loading="eager"
                        fetchPriority="high"
                        sizes="(max-width: 833px) 90vw, (max-width: 1193px) 40vw, (max-width: 1919px) 36vw, 657px"
                        className="h-auto w-full"
                    />
                </picture>
            </div>

            <div className="z-20 flex flex-col items-center text-center animate-slide-in-right ipad:items-end ipad:text-right">
                <p className="font-taviraj text-4xs uppercase tracking-[2px] text-gold-500">
                    Open to remote / hybrid roles
                </p>
                <h2 className="mt-3 font-cinzel text-xl font-bold leading-tight text-gold-primary ipad:text-lg laptop:text-xl desk:text-2xl">
                    Full-Stack TypeScript Developer
                </h2>
                <p className="mt-4 max-w-[460px] font-lora text-4xs leading-relaxed text-white mobile:text-2xs ipad:text-4xs laptop:text-2xs">
                    I build and deploy accessible web products with Next.js, React, NestJS and PostgreSQL.
                </p>
                <p className="mt-3 max-w-[460px] font-lato text-5xs text-gold-200 laptop:text-4xs">
                    Live proof: this portfolio runs end to end on Vercel, Render and PostgreSQL.
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3 ipad:justify-end">
                    <Button text="View Projects" size="small" href="/projects"/>
                    <Button text="Open CV (PDF)" size="small" href={CV_URL} target="_blank"/>
                    <Button text="Contact" size="small" href="/contact"/>
                </div>
            </div>
        </section>
    );
};

export default Hero;
