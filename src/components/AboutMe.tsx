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
    aboutMe: IBlockImg;
    headingLevel?: 1 | 2;
}

const AboutMe = ({aboutMe, headingLevel = 2}: AboutMeProps) => {

    const {text, title, subtitle, imgId} = aboutMe;
    const {ref, isVisible} = useInView<HTMLDivElement>()
    const router = useRouter();

    return (
        <section
            className={"mx-auto mt-15 grid min-h-1 min-w-1 grid-cols-1 items-center justify-items-center gap-x-30 px-4 laptop:grid-cols-[428px_minmax(0,560px)] laptop:grid-rows-[auto_auto_auto] laptop:justify-center " + getAnimation(isVisible, 'animate-slide-in-bottom')}
            ref={ref}
        >
            <div className="laptop:col-start-2 laptop:row-start-1 laptop:justify-self-start">
                <Title title={title} subtitle={subtitle} position="left" headingLevel={headingLevel}/>
            </div>
            <Image
                src={process.env.NEXT_PUBLIC_API_URL + "/media/" + imgId}
                alt="Portrait of Maksym Aksamitnyi"
                width={428}
                height={572}
                sizes="(max-width: 583px) 70vw, 428px"
                className="mt-6 h-auto max-mobile:w-[70vw] laptop:col-start-1 laptop:row-start-1 laptop:row-span-3 laptop:mt-0"
            />
            <p
                className="mt-11 w-[90vw] max-w-[667px] text-center font-lora text-2xs laptop:col-start-2 laptop:row-start-2 laptop:mt-2 laptop:w-[560px] laptop:text-left laptop:text-sm"
                dangerouslySetInnerHTML={{__html: text}}
            />
            <div className="mt-8.5 laptop:col-start-2 laptop:row-start-3 laptop:mt-20 laptop:justify-self-start">
                <Button text="Read More" size="large" onClick={() => router.push('/about-me')}/>
            </div>
        </section>
    );
};

export default AboutMe;
