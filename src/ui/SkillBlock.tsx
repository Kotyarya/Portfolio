import React from 'react';
import type {ISkill} from "@/types/blocksDataTypes";
import Image from "next/image";

interface SkillBlockProps {
    skill: ISkill;
}

const SkillBlock = ({skill}: SkillBlockProps) => {

    return (
        <div className="bg-gold-gradient flex items-center justify-center p-1 w-fit">
            <div className="w-[204px] h-[204px] bg-black-400 flex items-center justify-center">
                <Image src={"http://localhost:4000/media/" + skill.img} alt={skill.name} width={116} height={116}/>
            </div>
        </div>
    );
};

export default SkillBlock;