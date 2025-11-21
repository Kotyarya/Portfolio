import React from 'react';
import type {IWhatsNextElement} from "@/types/blocksDataTypes";
import Image from 'next/image';
import {Check} from 'lucide-react'

interface WhatsNextCardProps {
    whatsNextElement: IWhatsNextElement
}

const WhatsNextCard = ({whatsNextElement}: WhatsNextCardProps) => {
    return (
        <div className="flex flex-col items-center bg-black-400 w-107 rounded-[8px]">
            <div className="flex flex-col items-center gap-15 pt-19 pb-6.5">
                <Image src={"http://localhost:4000/media/" + whatsNextElement.imgId} alt={whatsNextElement.title}
                       width={261} height={127} className="w-auto h-32"/>
                <h2 className="text-gold-primary text-xl font-cinzel text-center font-bold">{whatsNextElement.title}</h2>
            </div>
            <div className="w-full flex flex-col gap-4.25 bg-black-primary p-10 rounded-b-[8px]">
                {
                    whatsNextElement.subtasksList.map((subtask, index) => (
                        <div key={index} className="flex items-center gap-3.5">
                            <div className="bg-gold-primary w-fit rounded-full p-1">
                                <Check size={20}/>
                            </div>
                            <p className="text-3xs font-lora text-gold-700">{subtask}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default WhatsNextCard;