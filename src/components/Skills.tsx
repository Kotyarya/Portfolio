"use client";
import React, {useEffect} from 'react';
import type {IBlock, ISkill} from "@/types/blocksDataTypes";
import Title from "@/ui/Title";
import SkillBlock from '@/ui/SkillBlock';
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import SkillModal from "@/components/SkillModal";
import {useInView} from "@/hooks/useInView";
import {getAnimation} from "@/utils/getAnimation";

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
}

const chunkArray = <T, >(arr: T[], size: number): T[][] =>
    Array.from({length: Math.ceil(arr.length / size)}, (_, i) =>
        arr.slice(i * size, i * size + size)
    );

const Skills = ({skillsPreview, skills, activeSkill, skillId}: SkillsProps) => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [chunks, setChunks] = React.useState<ISkill[][]>([]);

    const [isBlur, setIsBlur] = React.useState(false);
    const [modalIsOpen, setModalIsOpen] = React.useState(false);

    useEffect(() => {
        setModalIsOpen(!!skillId);
    }, [skillId]);

    useEffect(() => {
        function handleResize() {
            setChunks(chunkArray(skills, getPattern(window.innerWidth).length));
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    const {isVisible, ref} = useInView<HTMLDivElement>()

    return (
        <>
            {
                modalIsOpen && skillId && (
                    <SkillModal activeSkill={activeSkill} closeModal={closeModal}/>
                )
            }
            <div className="flex flex-col items-center gap-10 mt-20" ref={ref}>
                <div
                    className={`absolute w-full h-full inset-0 z-200 pointer-events-none backdrop-blur-[8px] transition-all ${isBlur ? "opacity-100" : "opacity-0"}`}></div>
                <div className={"flex flex-col items-center " + getAnimation(isVisible, "animate-slide-in-bottom")}>
                    <Title title={skillsPreview.title} subtitle={skillsPreview.subtitle} position={"center"}/>
                    <p className="w-[90vw] text-2xs mobile:w-[530px] ipad:w-[693px] laptop:w-[840px] laptop:text-sm text-white font-lora text-center">{skillsPreview.text}</p>
                </div>
                <div className={"flex flex-col items-center w-full "}>
                    {chunks.map((chunk, chunkIndex) => (
                        <div
                            className={"relative w-[1255px] max-desk:w-[1190px] " + (chunk.length < 7 ? (getPattern(window.innerWidth) == SKILLS_PATTERN_BELOW_800 || getPattern(window.innerWidth) == SKILLS_PATTERN_BELOW_560 ? (chunk.length > 3 ? "h-215" : "h-100") : "h-100") : "h-215")}
                            key={chunkIndex}>
                            {
                                chunk.map((skill, index) => {
                                    const pattern = (getPattern(window.innerWidth))[index];

                                    return <div
                                        key={index}
                                        className="absolute cursor-pointer animate-float transition duration-300 hover:animate-none hover:shadow-gold-small"
                                        style={{
                                            top: pattern.top,
                                            left: pattern.left,
                                            animationDelay: `${index * 0.15}s`,
                                        }}
                                        onMouseEnter={(e) => {
                                            setIsBlur(true);
                                            e.currentTarget.style.zIndex = "999";
                                        }}
                                        onMouseLeave={(e) => {
                                            setIsBlur(false);
                                            e.currentTarget.style.zIndex = "1";
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