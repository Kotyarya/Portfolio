"use client";
import React from 'react';
import type {IBlock} from "@/types/blocksDataTypes";
import Title from "@/ui/Title";
import Button from '@/ui/Button';
import {useRouter} from "next/navigation";
import {useInView} from "@/hooks/useInView";
import {getAnimation} from "@/utils/getAnimation";
import {CONTACT_EMAIL} from '@/config/site';

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
            <div className="flex flex-wrap items-center justify-center gap-5">
                <Button text={"Contact Me"} size={'large'} onClick={() => router.push('/contact')}/>
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-lato text-3xs text-gold-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-primary">
                    {CONTACT_EMAIL}
                </a>
            </div>
        </div>
    );
};

export default ContactMe;
