"use client";

import React, {useEffect} from 'react';
import type {IBlock, ISkill} from "@/types/blocksDataTypes";
import Title from "@/ui/Title";
import SkillBlock from '@/ui/SkillBlock';
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import SkillModal from "@/components/SkillModal";

interface SkillsProps {
    skillsPreview: IBlock,
    skills: ISkill[],
    skillId?: number,
    activeSkill?: ISkill,
}

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

const chunkArray = <T, >(arr: T[], size: number): T[][] =>
    Array.from({length: Math.ceil(arr.length / size)}, (_, i) =>
        arr.slice(i * size, i * size + size)
    );

const Skills = ({skillsPreview, skills, activeSkill, skillId}: SkillsProps) => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const chunks = chunkArray(skills, SKILLS_PATTERN.length);

    const [isBlur, setIsBlur] = React.useState(false);
    const [modalIsOpen, setModalIsOpen] = React.useState(false);

    useEffect(() => {
        setModalIsOpen(!!skillId);
    }, [skillId]);

    const openModal = (skillId: number) => {
        setIsBlur(false)
        const params = new URLSearchParams(searchParams.toString());
        params.set("skillId", skillId.toString());
        router.push(`${pathname}?${params.toString()}`, {scroll: false});
    }

    const closeModal = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("skillId");
        router.push(`${pathname}?${params.toString()}`, {scroll: false});
    }

    return (
        <>
            {
                modalIsOpen && skillId && (
                    <SkillModal activeSkill={activeSkill} closeModal={closeModal}/>
                )
            }
            <div className="flex flex-col items-center gap-10">
                <div
                    className={`absolute w-full h-full inset-0 z-999 pointer-events-none backdrop-blur-[8px] transition-all ${isBlur ? "opacity-100" : "opacity-0"}`}></div>
                <div className="flex flex-col items-center">
                    <Title title={skillsPreview.title} subtitle={skillsPreview.subtitle} position={"center"}/>
                    <p className="w-[840px] text-white text-sm font-lora text-center">{skillsPreview.text}</p>
                </div>
                <div className="flex flex-col items-center w-full">
                    {chunks.map((chunk, chunkIndex) => (
                        <div className="relative w-[1255px] h-215" key={chunkIndex}>
                            {
                                chunk.map((skill, index) => {
                                    const pattern = SKILLS_PATTERN[index];

                                    return <div
                                        key={index}
                                        className="absolute cursor-pointer animate-float transition duration-300 hover:animate-none hover:z-999 hover:shadow-gold-small"
                                        style={{
                                            top: pattern.top,
                                            left: pattern.left,
                                            animationDelay: `${index * 0.15}s`,
                                        }}
                                        onMouseEnter={() => {
                                            setIsBlur(true);
                                        }}
                                        onMouseLeave={() => {
                                            setIsBlur(false);
                                        }}
                                        onClick={() => openModal(skill.id)}
                                    >
                                        <SkillBlock skill={skill}/>
                                    </div>
                                })
                            }
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Skills;