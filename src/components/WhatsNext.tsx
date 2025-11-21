import React from 'react';
import type {IBlockWhatsNext} from "@/types/blocksDataTypes";
import Title from '@/ui/Title';
import WhatsNextCard from "@/ui/WhatsNextCard";

interface WhatsNextProps {
    whatsNext: IBlockWhatsNext
}

const WhatsNext = ({whatsNext}: WhatsNextProps) => {


    return (
        <div className="bg-gold-gradient flex flex-col items-center p-21">
            <Title title={whatsNext.title} subtitle={whatsNext.subtitle} blackMode={true}/>
            <p className="text-black-100 text-sm font-lora w-176 text-center">{whatsNext.text}</p>
            <div className="flex gap-5 items-center mt-21">
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