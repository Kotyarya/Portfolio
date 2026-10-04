"use client";

import React, {useEffect, useRef, useState} from "react";
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

    const BASE_WIDTH = 833;

    const [innerWidth, setInnerWidth] = useState<number>(0);
    const scaledRef = useRef<HTMLDivElement | null>(null);
    const [scale, setScale] = useState(1);
    const [scaledHeight, setScaledHeight] = useState<number>();

    useEffect(() => {
        const update = () => {
            const width = window.innerWidth;
            setInnerWidth(width);
            setScale(Math.min(width / BASE_WIDTH, 1));

            requestAnimationFrame(() => {
                if (!scaledRef.current) return;
                setScaledHeight(scaledRef.current.getBoundingClientRect().height);
            });
        };

        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    return (
        <section className="w-full" aria-labelledby="hero-heading">
            <div className="w-full overflow-hidden" style={{height: scaledHeight}}>
                <div
                    ref={scaledRef}
                    className="relative left-1/2 origin-top"
                    style={{
                        width: (innerWidth - 14) > BASE_WIDTH ? "auto" : BASE_WIDTH,
                        transform: `translateX(-50%) scale(${scale})`,
                    }}
                >
                    <div className="w-full max-ipad:flex max-ipad:flex-col max-ipad:items-center">
                        <div
                            className="flex justify-between w-full items-center px-14 relative h-150 max-ipad:h-[1172px] wide:h-250 overflow-hidden wide:px-65">
                            <h1
                                id="hero-heading"
                                className="text-7xl max-desk:text-5xl font-bold font-cinzel text-gold-primary w-[510px] max-desk:w-[400px] max-laptop:pb-25 animate-slide-in-left max-ipad:!text-[102px] max-ipad:!leading-[134px] max-ipad:!w-[619px]"
                            >
                                Greetings, I am Max
                            </h1>
                            <span className="sr-only">Maksym Aksamitnyi Максім Аксамітний Максим Аксамитный</span>

                            <div
                                className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 max-ipad:bottom-[347px] max-ipad:pl-[227px]">
                                <div
                                    className="w-190 h-170 wide:w-260 wide:h-260 absolute bottom-0 left-1/2 -translate-x-1/2 z-[-1] max-ipad:bottom-56 max-ipad:pl-40">
                                    <Image src={Ellipse} alt="" aria-hidden="true" className="w-full h-full"/>
                                </div>

                                <Image
                                    src={MyPhoto}
                                    alt="Maksym Aksamitnyi, full-stack developer"
                                    width={600}
                                    priority
                                    sizes="(max-width: 833px) 0px, (max-width: 1193px) 480px, (max-width: 1919px) 600px, 936px"
                                    className="z-10 animate-fade wide:w-234 max-ipad:hidden max-laptop:w-120"
                                />

                                <div className="relative w-[634.95px] h-[669.03px] ipad:hidden">
                                    <Image
                                        src={MyPhotoMobile}
                                        alt="Maksym Aksamitnyi, full-stack developer"
                                        priority
                                        fill
                                        sizes="(max-width: 833px) 635px, 0px"
                                        className="z-10 animate-fade object-contain"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col items-end max-ipad:hidden max-laptop:pt-40">
                                <h3 className="text-lg font-cinzel text-right mb-7 animate-slide-in-right">
                                    {subtitle}
                                </h3>
                                <h2 className="text-2xl max-desk:text-xl font-cinzel font-bold w-[457px] max-desk:w-[366px] max-laptop:!w-[346px] text-right m-0 animate-slide-in-right">
                                    {title}
                                </h2>
                                <p className="text-xs font-cinzel text-right w-[424px] max-desk:w-[367px] max-laptop:mt-7 animate-slide-in-right">
                                    {text}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="flex flex-col items-center w-full px-10 max-mobile:px-4 -mt-55 max-mobile:-mt-35 ipad:hidden">
                <h3 className="text-base max-mobile:text-xs font-cinzel text-center mb-4 animate-slide-in-right">
                    {subtitle}
                </h3>
                <h2 className="text-lg max-mobile:text-sm text-center font-cinzel font-bold animate-slide-in-right">
                    {title}
                </h2>
                <p className="text-2xs max-mobile:text-4xs font-cinzel text-center mt-4 animate-slide-in-right">
                    {text}
                </p>
            </div>
        </section>
    );
};

export default Hero;
