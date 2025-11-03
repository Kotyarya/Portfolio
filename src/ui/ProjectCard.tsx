import React from 'react';
import type {IProject} from "@/types/blocksDataTypes";
import Image from "next/image"
import ProjectTagBlock from "@/ui/ProjectTagBlock";
import Button from "@/ui/Button";
import ProjectStatusLabel from "@/ui/ProjectStatusLabel";

interface ProjectCardProps {
    project: IProject;
}

const ProjectCard = ({project}: ProjectCardProps) => {

    const skillsArray = ["JavaScript", "React", "Node.js", "CSS", "HTML"]; // Example skills array

    return (
        <div className='bg-gold-gradient p-[5px] rounded-[6px]'>
            <div className='flex flex-col bg-black-300 relative'>
                <div className="absolute top-2 right-2">
                    <ProjectStatusLabel status={project.status.name}/>
                </div>
                <Image src={"http://localhost:4000/media/" + project.img} alt={"ProjectImg"} width={334} height={194}
                       className="w-[100%] h-[220px]"/>
                <div className="p-5">
                    <h3 className="relative block w-[300px] h-[33px] overflow-hidden font-lora text-gold-primary text-sm mb-7 before:content-[''] before:absolute before:inset-0 before:shadow-[inset_-7px_0_7.5px_0px_rgba(20,20,20,1)] before:pointer-events-none before:z-10">{project.name}</h3>
                    <p className="relative block w-[304px] h-[42px] overflow-hidden font-lato text-gold-800 text-4xs mb-8 before:content-[''] before:absolute before:inset-0 before:shadow-[inset_-7px_0_7.5px_0px_rgba(20,20,20,1)] before:pointer-events-none before:z-10 before:h-4 before:top-6">{project.text}</p>
                    <p className="font-lora text-gold-700 text-4xs mb-2.5">Tech Stacks :</p>
                    <div className="flex w-56 h-16 flex-wrap gap-2 overflow-hidden mb-5">
                        {skillsArray.map((skill, i) => {
                            return (
                                <ProjectTagBlock name={skill} key={i}/>
                            );
                        })}
                    </div>
                    <Button text={"View More"} size={"small"}/>
                </div>

            </div>
        </div>
    );
};

export default ProjectCard;