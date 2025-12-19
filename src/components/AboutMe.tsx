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
    const {ref, isVisible} = useInView<HTMLImageElement>()
    const router = useRouter();

    return (
        <div className='flex items-center justify-center gap-45'>
            <Image src={"http://localhost:4000/media/" + imgId} alt={title} width={428} height={572}
                   className={getAnimation(isVisible, 'animate-slide-in-left')} ref={ref}/>
            <div className={getAnimation(isVisible, 'animate-slide-in-right')}>
                <Title title={title} subtitle={subtitle} position='left'/>
                <p className='text-sm font-lora font-regular w-[560px] mt-2 mb-20'
                   dangerouslySetInnerHTML={{__html: text}}/>
                <Button text={"Read More"} size={'large'} onClick={() => router.push('/about-me')}/>
            </div>
        </div>
    );
};

export default AboutMe;