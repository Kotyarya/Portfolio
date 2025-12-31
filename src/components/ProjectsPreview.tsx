"use client";
import React from 'react';
import type {IBlock, IProject} from "@/types/blocksDataTypes";
import Title from "@/ui/Title";
import Button from "@/ui/Button";
import ProjectCarousel from "@/components/ProjectCarousel/ProjectCarousel";
import {useRouter} from "next/navigation";
import {useInView} from "@/hooks/useInView";
import {getAnimation} from "@/utils/getAnimation";

interface ProjectsPreviewProps {
    projectsPreview: IBlock,
    projects: IProject[]
}

const ProjectsPreview = ({projectsPreview, projects}: ProjectsPreviewProps) => {

    const {title, subtitle, text} = projectsPreview;
    const router = useRouter();
    const {ref, isVisible} = useInView<HTMLDivElement>()

    return (
        <div className="flex flex-col items-center justify-center w-full" ref={ref}>
            <div
                className={"flex flex-col items-center justify-center w-full " + getAnimation(isVisible, "animate-slide-in-bottom")}>
                <Title title={title} subtitle={subtitle} position={"center"}/>
                <p className="w-[90vw] text-2xs mobile:w-[530px] ipad:w-[693px] laptop:w-[840px] laptop:text-sm text-white font-lora text-center mb-14">{text}</p>
                <Button text="View More" size="large" onClick={() => router.push('/projects')}/>
            </div>
            <div className={getAnimation(isVisible, 'animate-fade')}>
                <ProjectCarousel items={projects} type={'projects'}/>
            </div>
        </div>
    );
};

export default ProjectsPreview;