"use client";
import React from 'react';
import type {IBlock} from "@/types/blocksDataTypes";
import Title from "@/ui/Title";
import Button from '@/ui/Button';
import {useRouter} from "next/navigation";
import {useInView} from "@/hooks/useInView";
import {getAnimation} from "@/utils/getAnimation";

interface ContactMeProps {
    contactMe: IBlock
}

const ContactMe = ({contactMe}: ContactMeProps) => {

    const router = useRouter();
    const {ref, isVisible} = useInView<HTMLDivElement>()

    return (
        <div
            className={'flex flex-col w-full items-center bg-black-300 p-10 ' + getAnimation(isVisible, "animate-fade")}
            ref={ref}>
            <Title title={contactMe.title} subtitle={contactMe.subtitle} position={'center'}/>
            <p className="w-[90vw] text-2xs mobile:w-[530px] ipad:w-[709px] laptop:w-210 laptop:text-sm font-lora text-center mt-4.5 mb-11">{contactMe.text}</p>
            <Button text={"Contact Me"} size={'large'} onClick={() => router.push('/contact')}/>
        </div>
    );
};

export default ContactMe;