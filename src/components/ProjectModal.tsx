import React from 'react';
import type {IProject} from "@/types/blocksDataTypes";
import {X} from "lucide-react";
import Image from "next/image";
import ProjectTagBlock from "@/ui/ProjectTagBlock";
import Button from "@/ui/Button";
import gitHubIcon from "@/assets/shared/gitHub.svg"
import internetIcon from "@/assets/shared/internet.svg"

interface ProjectModalProps {
    activeProject?: IProject;
    closeModal: () => void;
}

const ProjectModal = ({activeProject, closeModal}: ProjectModalProps) => {

    const {text, category, status, img, name, githubLink, skills, link} = activeProject || {};

    return (
        <>
            <div className="absolute w-full h-full bg-black opacity-80 z-999 top-0">
            </div>
            <div className="w-fit bg-gold-gradient p-1 z-1000 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="bg-black flex items-center p-10 pr-14 w-max gap-10">
                    <Image src={"http://localhost:4000/media/" + img} alt={"ProjectImg"} width={677} height={508}
                           className="w-[677px] h-[508px]"/>
                    <div className="flex flex-col w-109 gap-6">
                        <h2 className="font-cinzel text-xl text-gold-primary font-bold">{name}</h2>
                        <p className="font-lora text-3xs text-white">{text}</p>
                        <p className="font-lora text-sm text-gold-700">Tech Stacks :</p>
                        <div className="flex flex-wrap gap-3 h-23.5 overflow-hidden">
                            {activeProject?.skills.map((skill, index) => (
                                <ProjectTagBlock name={skill.name} key={index} isLarge={true}/>
                            ))}
                        </div>
                        <div className="flex gap-4">
                            <Button text={"View Projects"} size={'large'}>
                                <Image src={internetIcon} alt="Internet Logo" width={25} height={25}/>
                            </Button>
                            <Button text={"View Code"} size={'large'}>
                                <Image src={gitHubIcon} alt="Github Logo" width={25} height={25}/>
                            </Button>
                        </div>
                    </div>
                    <button
                        className='w-fit h-fit flex items-center justify-center text-gold-primary cursor-pointer absolute top-4.5 right-4.5'
                        onClick={closeModal}>
                        <X size={30}/>
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProjectModal;