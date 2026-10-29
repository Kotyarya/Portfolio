import Image from 'next/image';
import {Braces, Code2, DatabaseZap, TestTube2} from 'lucide-react';
import type {ISkill} from '@/types/blocksDataTypes';

interface SkillVisualProps {
    skill: ISkill;
    size?: 'card' | 'modal';
}

const fallbackIcon = (name: string) => {
    const key = name.toLowerCase();
    if (key === 'supabase' || key === 'sequelize') return DatabaseZap;
    if (key === 'testing') return TestTube2;
    if (key === 'redux' || key === 'express') return Braces;
    return Code2;
};

const SkillVisual = ({skill, size = 'card'}: SkillVisualProps) => {
    const dimension = size === 'modal' ? 128 : 116;

    if (skill.img) {
        return (
            <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/media/${skill.img}`}
                alt={`${skill.name} technology logo`}
                height={dimension}
                width={dimension}
                sizes={size === 'modal' ? '128px' : '116px'}
                className={size === 'modal' ? 'h-32 w-32 object-contain' : 'h-auto w-auto !max-w-31.5'}
            />
        );
    }

    const Icon = fallbackIcon(skill.name);
    return (
        <span className="flex flex-col items-center gap-3 text-gold-primary" role="img" aria-label={`${skill.name} technology`}>
            <Icon aria-hidden="true" size={size === 'modal' ? 88 : 78} strokeWidth={1.35}/>
            <span className="max-w-[170px] text-center font-taviraj text-3xs leading-tight">{skill.name}</span>
        </span>
    );
};

export default SkillVisual;
