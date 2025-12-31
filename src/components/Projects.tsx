"use client";

import React from "react";
import Title from "@/ui/Title";
import ProjectCard from "@/ui/ProjectCard";
import ProjectsFilters, {type FilterOptions} from "@/components/ProjectsFilter";
import type {IProject} from "@/types/blocksDataTypes";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import ProjectModal from "@/components/ProjectModal/ProjectModal";
import {useInView} from "@/hooks/useInView";
import {getAnimation} from "@/utils/getAnimation";

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
    const {ref, isVisible} = useInView<HTMLDivElement>();


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
            <div className="flex flex-col items-center justify-center w-full mt-20" ref={ref}>
                <div
                    className={"flex flex-col items-center justify-center " + getAnimation(isVisible, "animate-slide-in-bottom")}>
                    <Title title={projectsPreview.title} subtitle={projectsPreview.subtitle} position="center"/>
                    <p className="w-[90vw] text-2xs mobile:w-[530px] ipad:w-[693px] laptop:max-w-[840px] laptop:text-sm text-white font-lora text-center mb-10">{projectsPreview.text}</p>
                </div>
                <div className="z-10 max-ipad:hidden">
                    <div className={getAnimation(isVisible, "animate-slide-in-bottom")}>
                        <ProjectsFilters
                            initialQuery={q}
                            initialCategory={category}
                            initialStatus={status}
                            initialStacks={stacks}
                            filterOptions={filterOptions}
                        />
                    </div>
                </div>
                <div
                    className={"grid grid-cols-[repeat(3,max-content)] max-desk:grid-cols-[repeat(2,max-content)] max-ipad:!grid-cols-[repeat(1,max-content)] gap-8 max-ipad:!gap-10 max-laptop:gap-4 justify-center mt-10 " + getAnimation(isVisible, "animate-fade")}>
                    {projects.map((item: IProject) => (
                        <ProjectCard key={item.id} project={item} onClick={() => openModal(item.id)}/>
                    ))}
                </div>
            </div>
        </>
    );
}