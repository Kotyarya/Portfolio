import React from 'react';
import type {ISkill} from "@/types/blocksDataTypes";
import SkillVisual from '@/ui/SkillVisual';

interface SkillBlockProps {
    skill: ISkill;
}

const SkillBlock = ({skill}: SkillBlockProps) => {

    return (
        <div className="bg-gold-gradient flex items-center justify-center p-1 w-fit">
            <div className="w-[204px] h-[204px] bg-black-400 flex items-center justify-center">
                <SkillVisual skill={skill}/>
            </div>
        </div>
    );
};

export default SkillBlock;
