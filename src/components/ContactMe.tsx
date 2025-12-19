"use client";
import React from 'react';
import type {IBlock} from "@/types/blocksDataTypes";
import Title from "@/ui/Title";
import Button from '@/ui/Button';
import {useRouter} from "next/navigation";

interface ContactMeProps {
    contactMe: IBlock
}

const ContactMe = ({contactMe}: ContactMeProps) => {

    const router = useRouter();

    return (
        <div className='flex flex-col items-center bg-black-300 p-10'>
            <Title title={contactMe.title} subtitle={contactMe.subtitle} position={'center'}/>
            <p className='w-210 text-sm font-lora text-center mt-4.5 mb-11'>{contactMe.text}</p>
            <Button text={"Contact Me"} size={'large'} onClick={() => router.push('/contact')}/>
        </div>
    );
};

export default ContactMe;