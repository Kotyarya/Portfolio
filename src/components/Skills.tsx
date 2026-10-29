"use client";

import React, {useEffect} from 'react';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import type {IBlock, ISkill} from '@/types/blocksDataTypes';
import Title from '@/ui/Title';
import SkillBlock from '@/ui/SkillBlock';
import SkillModal from '@/components/SkillModal';
import {useInView} from '@/hooks/useInView';
import {getAnimation} from '@/utils/getAnimation';

interface SkillsProps {
    skillsPreview: IBlock;
    skills: ISkill[];
    skillId?: number;
    activeSkill?: ISkill;
}

// Original hand-positioned Skills composition from commit 6634981.
const SKILLS_PATTERN: { top: number; left: number }[] = [
    {top: 32, left: 0},
    {top: 16, left: 349},
    {top: 0, left: 794},
    {top: 102, left: 1051},
    {top: 189, left: 183},
    {top: 189, left: 580},
    {top: 283, left: 878},
    {top: 403, left: 18},
    {top: 421, left: 387},
    {top: 478, left: 692},
    {top: 528, left: 997},
    {top: 630, left: 184},
    {top: 656, left: 500},
];

const SKILLS_PATTERN_BELOW_1350: { top: number; left: number }[] = [
    {top: 16, left: 349},
    {top: 0, left: 794},
    {top: 189, left: 103},
    {top: 189, left: 580},
    {top: 283, left: 878},
    {top: 421, left: 307},
    {top: 478, left: 692},
    {top: 630, left: 104},
    {top: 656, left: 580},
];

const SKILLS_PATTERN_BELOW_1194: { top: number; left: number }[] = [
    {top: 16, left: 349},
    {top: 0, left: 754},
    {top: 189, left: 253},
    {top: 189, left: 580},
    {top: 283, left: 778},
    {top: 421, left: 307},
    {top: 478, left: 692},
    {top: 630, left: 254},
    {top: 656, left: 580},
];

const SKILLS_PATTERN_BELOW_800: { top: number; left: number }[] = [
    {top: 16, left: 349},
    {top: 189, left: 580},
    {top: 301, left: 327},
    {top: 478, left: 652},
    {top: 600, left: 364},
    {top: 756, left: 615},
];

const SKILLS_PATTERN_BELOW_560: { top: number; left: number }[] = [
    {top: 16, left: 419},
    {top: 189, left: 570},
    {top: 301, left: 439},
    {top: 478, left: 560},
    {top: 600, left: 429},
    {top: 756, left: 570},
];

const getPattern = (width: number) => {
    if (width >= 1364) return SKILLS_PATTERN;
    if (width >= 1208) return SKILLS_PATTERN_BELOW_1350;
    if (width >= 814) return SKILLS_PATTERN_BELOW_1194;
    if (width >= 575) return SKILLS_PATTERN_BELOW_800;
    return SKILLS_PATTERN_BELOW_560;
};

const chunkArray = <T, >(arr: T[], size: number): T[][] =>
    Array.from({length: Math.ceil(arr.length / size)}, (_, i) =>
        arr.slice(i * size, i * size + size)
    );

const Skills = ({skillsPreview, skills, activeSkill, skillId}: SkillsProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [pattern, setPattern] = React.useState(SKILLS_PATTERN_BELOW_560);
    const [chunks, setChunks] = React.useState<ISkill[][]>(() => chunkArray(skills, SKILLS_PATTERN_BELOW_560.length));
    const [isBlurred, setIsBlurred] = React.useState(false);
    const {isVisible, ref} = useInView<HTMLDivElement>();

    useEffect(() => {
        const handleResize = () => {
            const nextPattern = getPattern(window.innerWidth);
            setPattern(nextPattern);
            setChunks(chunkArray(skills, nextPattern.length));
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [skills]);

    const openModal = (id: number) => {
        setIsBlurred(false);
        const params = new URLSearchParams(searchParams.toString());
        params.set('skillId', id.toString());
        router.push(`${pathname}?${params.toString()}`, {scroll: false});
    };

    const closeModal = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('skillId');
        const query = params.toString();
        router.push(query ? `${pathname}?${query}` : pathname, {scroll: false});
    };

    return (
        <>
            {skillId && <SkillModal activeSkill={activeSkill} closeModal={closeModal}/>}

            <div
                aria-hidden="true"
                className={`pointer-events-none fixed inset-0 z-40 bg-black/15 backdrop-blur-[8px] transition-opacity duration-300 ${isBlurred ? 'opacity-100' : 'opacity-0'}`}
            />

            <section className="mt-20 flex flex-col items-center gap-10" ref={ref}>
                <div className={`flex flex-col items-center ${getAnimation(isVisible, 'animate-slide-in-bottom')}`}>
                    <Title title={skillsPreview.title} subtitle={skillsPreview.subtitle} position="center" headingLevel={1}/>
                    <p className="w-[90vw] text-center font-lora text-2xs text-white mobile:w-[530px] ipad:w-[693px] laptop:w-[840px] laptop:text-sm">
                        {skillsPreview.text}
                    </p>
                </div>

                <div className="flex w-full flex-col items-center">
                    {chunks.map((chunk, chunkIndex) => {
                        const compactPattern = pattern === SKILLS_PATTERN_BELOW_800 || pattern === SKILLS_PATTERN_BELOW_560;
                        const height = chunk.length < 7
                            ? compactPattern && chunk.length > 3 ? 'h-215' : 'h-100'
                            : 'h-215';

                        return (
                            <ul
                                className={`relative w-[1255px] max-desk:w-[1190px] ${height}`}
                                key={chunkIndex}
                            >
                                {chunk.map((skill, index) => {
                                    const coordinates = pattern[index];

                                    return (
                                        <li
                                            key={skill.id}
                                            className="absolute"
                                            style={{top: coordinates.top, left: coordinates.left}}
                                        >
                                            <button
                                                type="button"
                                                aria-haspopup="dialog"
                                                aria-label={`Open ${skill.name} details`}
                                                onClick={() => openModal(skill.id)}
                                                onMouseEnter={() => setIsBlurred(true)}
                                                onMouseLeave={() => setIsBlurred(false)}
                                                onFocus={() => setIsBlurred(true)}
                                                onBlur={() => setIsBlurred(false)}
                                                className="relative z-50 animate-float cursor-pointer transition duration-300 hover:animate-none hover:shadow-gold-small focus-visible:animate-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-primary"
                                                style={{animationDelay: `${index * 0.15}s`}}
                                            >
                                                <SkillBlock skill={skill}/>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        );
                    })}
                </div>
            </section>
        </>
    );
};

export default Skills;
