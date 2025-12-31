"use client";
import React from 'react';
import type {IBlockWhatsNext} from "@/types/blocksDataTypes";
import Title from '@/ui/Title';
import WhatsNextCard from "@/ui/WhatsNextCard";
import {useInView} from "@/hooks/useInView";
import {getAnimation} from "@/utils/getAnimation";

interface WhatsNextProps {
    whatsNext: IBlockWhatsNext
}

const WhatsNext = ({whatsNext}: WhatsNextProps) => {

    const {ref, isVisible} = useInView<HTMLDivElement>()

    return (
        <div
            className="bg-gold-gradient w-full flex flex-col items-center p-21 max-mobile:p-0 max-mobile:pb-21 max-mobile:pt-21"
            ref={ref}>
            <div className={"flex flex-col items-center " + getAnimation(isVisible, 'animate-slide-in-bottom')}>
                <Title title={whatsNext.title} subtitle={whatsNext.subtitle} blackMode={true}/>
                <p className="text-black-100 w-[90vw] text-2xs mobile:w-[530px] ipad:w-176 laptop:text-sm font-lora text-center">{whatsNext.text}</p>
            </div>
            <div
                className={"flex max-desk:flex-wrap justify-center w-full gap-5 items-center mt-21 " + getAnimation(isVisible, 'animate-fade')}>
                {
                    whatsNext.whatsNextList.map((whatsNext, i) => (
                        <WhatsNextCard key={i} whatsNextElement={whatsNext}/>
                    ))
                }
            </div>
        </div>
    );
};

export default WhatsNext;