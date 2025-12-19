'use client';

import React, {useEffect, useMemo, useState} from 'react';
import type {IBlock, ISkill} from "@/types/blocksDataTypes";
import ColumnScroller from "@/components/ColumnScroller";
import Title from '@/ui/Title';
import Button from "@/ui/Button";
import {useRouter} from "next/navigation";

interface SkillsPreviewProps {
    skills: ISkill[];
    skillsPreview: IBlock;
}

const getColsCount = (width: number) => {
    if (width >= 1400) return 6;
    if (width >= 1194) return 4;
    return 3;
}

const SkillsPreview = ({skills, skillsPreview}: SkillsPreviewProps) => {

    const {title, subtitle, text} = skillsPreview;
    const [colsCount, setColsCount] = useState<number>(6);

    useEffect(() => {
        function handleResize() {
            setColsCount(getColsCount(window.innerWidth));
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const columns: ISkill[][] = useMemo(() => {
        const cols = Array.from({length: colsCount}, () => []);

        skills.forEach((skill, index) => {
            const colIndex = index % colsCount;
            // @ts-ignore
            cols[colIndex].push(skill);
        });

        return cols;
    }, [skills, colsCount]);

    const router = useRouter();
    return (
        <div className="flex flex-col items-center">
            <Title title={title} subtitle={subtitle} position={"center"}/>
            <p className="w-[840px] text-white text-sm font-lora text-center mb-14">{text}</p>
            <Button text="View More" size="large" onClick={() => router.push('/skills')}/>
            <div
                className="flex justify-center bg-black-300 w-[100%] mt-14"
                style={{
                    columnGap: '20px',
                }}
            >
                {columns.map((colSkills, colIdx) => {
                    const direction = colIdx % 2 === 0 ? 'up' : 'down';
                    const delayOffsetSec = -colIdx * 2;

                    return (
                        <ColumnScroller
                            key={colIdx}
                            skills={colSkills}
                            direction={direction}
                            delayOffsetSec={delayOffsetSec}
                        />
                    );
                })}
            </div>
        </div>
    );
};


export default SkillsPreview;