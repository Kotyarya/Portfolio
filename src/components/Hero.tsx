import React from 'react';
import type {IBlock} from '@/types/blocksDataTypes';
import Image from 'next/image';
import MyPhoto from '../assets/hero/my-photo.png';

interface HeroProps {
    hero: IBlock
}

const Hero = ({hero}: HeroProps) => {

    const {text, title, subtitle} = hero;

    return (
        <div className='flex justify-between items-center px-14 relative mt-30'>
            <h1 className='text-7xl font-bold font-cinzel text-gold-primary w-[510px] animate-slide-in-left'>Greetings,
                I am Max</h1>
            <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2">
                <div
                    className="w-[350px] h-[350px] absolute bottom-20 left-1/2 -translate-x-1/2 z-[-1] rounded-[50%] bg-[radial-gradient(circle,_#AD9255_0%,_rgba(115,115,115,0)_100%)] blur-[100px] animate-scale-in"></div>
                <Image src={MyPhoto} alt="my photo" width={600} priority={true}
                       className='z-10 animate-fade'/>
            </div>
            <div className="flex flex-col items-end">
                <h3 className='text-lg font-cinzel text-right mb-7 animate-slide-in-right'>{subtitle}</h3>
                <h2 className='text-2xl font-cinzel font-bold w-[457px] text-right m-0 animate-slide-in-right'>{title}</h2>
                <p className='text-xs font-cinzel text-right w-[424px] animate-slide-in-right'>{text}</p>
            </div>
        </div>
    );
};

export default Hero;