import React from 'react';
import type {IBlock, IProject} from "@/types/blocksDataTypes";
import Title from "@/ui/Title";
import Button from "@/ui/Button";
import ProjectCarousel from "@/components/ProjectCarousel/ProjectCarousel";

interface ProjectsPreviewProps {
    projectsPreview: IBlock,
    projects: IProject[]
}

const ProjectsPreview = ({projectsPreview, projects}: ProjectsPreviewProps) => {

    const {title, subtitle, text} = projectsPreview;

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <Title title={title} subtitle={subtitle} position={"center"}/>
            <p className="w-[840px] text-white text-sm font-lora text-center mb-14">{text}</p>
            <Button text="View More" size="large"/>
            <ProjectCarousel projects={projects} loop={true} autoplayMs={5000}/>
        </div>
    );
};

export default ProjectsPreview;