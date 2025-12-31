'use client';

import React from 'react';
import type {IBlockImg} from '@/types/blocksDataTypes';
import Image from 'next/image';
import Title from '@/ui/Title';
import {useInView} from '@/hooks/useInView';
import {getAnimation} from '@/utils/getAnimation';
import Button from '@/ui/Button';
import {useRouter} from "next/navigation";

interface AboutMeProps {
    aboutMe: IBlockImg
}

const AboutMe = ({aboutMe}: AboutMeProps) => {

    const {text, title, subtitle, imgId} = aboutMe;
    const {ref, isVisible} = useInView<HTMLDivElement>()
    const router = useRouter();

    return (
        <div className="min-w-1 min-h-1" ref={ref}>
            <div className='flex items-center justify-center gap-45 max-desk:gap-30 mt-15 max-laptop:hidden'>
                <Image src={process.env.NEXT_PUBLIC_API_URL + "/media/" + imgId} alt={title} width={428} height={572}
                       className={getAnimation(isVisible, 'animate-slide-in-left')}/>
                <div className={getAnimation(isVisible, 'animate-slide-in-right')}>
                    <Title title={title} subtitle={subtitle} position='left'/>
                    <p className='text-sm font-lora font-regular w-[560px] mt-2 mb-20'
                       dangerouslySetInnerHTML={{__html: text}}/>
                    <Button text={"Read More"} size={'large'} onClick={() => router.push('/about-me')}/>
                </div>
            </div>
            <div
                className={"laptop:hidden mt-15 flex flex-col justify-center items-center " + getAnimation(isVisible, 'animate-slide-in-bottom')}>
                <Title title={title} subtitle={subtitle} position='center'/>
                <Image src={process.env.NEXT_PUBLIC_API_URL + "/media/" + imgId} alt={title} width={428}
                       height={572} className={'mt-6 max-mobile:w-[70vw]'}
                />
                <p className='text-2xs text-center font-lora font-regular w-[667px] max-ipad:w-[530px] max-mobile:!w-[90vw] mt-11 mb-8.5'
                   dangerouslySetInnerHTML={{__html: text}}/>
                <Button text={"Read More"} size={'large'} onClick={() => router.push('/about-me')}/>
            </div>
        </div>
    );
};

export default AboutMe;