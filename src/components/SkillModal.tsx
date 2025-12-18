import React from 'react';
import type {ISkill} from "@/types/blocksDataTypes";
import Image from "next/image";
import {X} from "lucide-react";
import Button from "@/ui/Button";

interface SkillModalProps {
    activeSkill?: ISkill,
    closeModal: () => void;
}

const SkillModal = ({activeSkill, closeModal}: SkillModalProps) => {

    const {name, img, text} = activeSkill || {};

    return (
        <div>
            <div className="absolute w-full h-full bg-black opacity-80 z-1000 top-0">
            </div>
            <div className="w-fit bg-gold-gradient p-1 z-1001 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="bg-black flex flex-col items-center w-163 p-16 gap-5">
                    <Image src={"http://localhost:4000/media/" + img} alt={"ProjectImg"} width={128} height={128}
                           className="w-32 h-32"/>
                    <h2 className="text-xl font-cinzel text-center text-gold-primary font-bold">{name}</h2>
                    <p className="font-lora text-3xs text-white text-center">{text}</p>
                    <p className="font-lora text-base text-gold-primary text-center">See where I used it.</p>
                    <Button text={"View Projects"} size={'large'}/>
                    <button
                        className='w-fit h-fit flex items-center justify-center text-gold-primary cursor-pointer absolute top-4.5 right-4.5'
                        onClick={closeModal}>
                        <X size={30}/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SkillModal;