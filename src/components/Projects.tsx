"use client";

import React from "react";
import Title from "@/ui/Title";
import ProjectCard from "@/ui/ProjectCard";
import ProjectsFilters, {type FilterOptions} from "@/components/ProjectsFilter";
import type {IProject} from "@/types/blocksDataTypes";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import ProjectModal from "@/components/ProjectModal/ProjectModal";

interface ProjectsSectionProps {
    projectsPreview: {
        title: string;
        subtitle: string;
        text: string;
    };
    filterOptions?: FilterOptions;
    searchParams: {
        q?: string;
        category?: string;
        status?: string;
        stacks?: string[];
        projectId?: number;
    };
    projects: IProject[];
    activeProject?: IProject;
}

export default function Projects({
                                     projectsPreview,
                                     filterOptions = {
                                         projectCategories: [],
                                         projectStatuses: [],
                                         projectSkills: []
                                     },
                                     searchParams: {
                                         q = "",
                                         category = "",
                                         status = "",
                                         stacks = [],
                                         projectId = undefined
                                     },
                                     projects,
                                     activeProject,
                                 }: ProjectsSectionProps) {


    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [modalIsOpen, setModalIsOpen] = React.useState(false);


    React.useEffect(() => {
        setModalIsOpen(!!projectId);
    }, [projectId])

    const openModal = (projectId: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("projectId", projectId.toString());
        router.push(`${pathname}?${params.toString()}`, {scroll: false});
    }

    const closeModal = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("projectId");
        router.push(`${pathname}?${params.toString()}`, {scroll: false});
    }

    return (
        <>
            {
                modalIsOpen && projectId && (
                    <ProjectModal activeProject={activeProject} closeModal={closeModal}/>
                )
            }
            <div className="flex flex-col items-center justify-center w-full">
                <Title title={projectsPreview.title} subtitle={projectsPreview.subtitle} position="center"/>
                <p className="max-w-[840px] text-white/90 text-sm font-lora text-center mb-10">{projectsPreview.text}</p>

                <ProjectsFilters
                    initialQuery={q}
                    initialCategory={category}
                    initialStatus={status}
                    initialStacks={stacks}
                    filterOptions={filterOptions}
                />

                <div className="grid grid-cols-[repeat(3,max-content)] gap-8 justify-center mt-10">
                    {projects.map((item: IProject) => (
                        <ProjectCard key={item.id} project={item} onClick={() => openModal(item.id)}/>
                    ))}
                </div>
            </div>
        </>
    );
}