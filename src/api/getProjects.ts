import 'server-only';
import {unstable_cache} from 'next/cache';
import {baseAPI, type IApiResponse} from "@/api/http";
import type {IProject} from "@/types/blocksDataTypes";
import {cache} from "react";
import {combinePortfolioCaseStudy} from '@/api/portfolioCaseStudy';

type ProjectSkill = { name: string; importance: number };
type ProjectCategory = { name: string };
type ProjectStatus = { name: string };


const getProjectCached = unstable_cache(
    async (category: string, skills: string[], status: string, search: string) => {
        const skillsParam = skills.length
            ? `&skills=${skills.map(skill => encodeURIComponent(skill)).join("&skills=")}&skills=`
            : "";


        const projects = await baseAPI
            .get<IApiResponse<IProject[]>>(
                `projects?category=${category}&status=${status}&search=${search}${skillsParam}`
            )
            .then(r => r.data);

        return combinePortfolioCaseStudy(projects.data);
    },
    ['projects-list'],
    {
        revalidate: 86400,
        tags: ['projects'],
    }
);


export const getProject = async (
    category: string,
    skills: string[],
    status: string,
    search: string
) => {
    const hasSearch = search.trim().length > 0;

    if (hasSearch) {
        const skillsParam = skills.length
            ? `&skills=${skills.join("&skills=")}&skills=`
            : "";

        const projects = await baseAPI
            .get<IApiResponse<IProject[]>>(
                `projects?category=${category}&status=${status}&search=${search}${skillsParam}`
            )
            .then(r => r.data);

        return combinePortfolioCaseStudy(projects.data);
    }


    return getProjectCached(category, skills, status, search);
};


const getProjectsFilterParamCached = unstable_cache(
    async () => {
        const [projectSkill, projectCategories, projectStatuses] = await Promise.all([
            baseAPI
                .get<IApiResponse<ProjectSkill[]>>("projects/skills")
                .then(r => r.data),
            baseAPI
                .get<IApiResponse<ProjectCategory[]>>("projects/categories")
                .then(r => r.data),
            baseAPI
                .get<IApiResponse<ProjectStatus[]>>("projects/statuses")
                .then(r => r.data),
        ]);

        return {
            projectSkills: projectSkill.data,
            projectCategories: projectCategories.data,
            projectStatuses: projectStatuses.data,
        };
    },
    ['projects-filters'],
    {
        revalidate: 86400,
        tags: ['projects', "projects:filters"],
    }
);

export const getProjectsFilterParam = async () => {
    return getProjectsFilterParamCached();
};


export const getProjectByIdCached = cache(async (id: number) => {
    return unstable_cache(
        async () => {
            if (id === 13) {
                const projects = await Promise.all([13, 14].map(projectId =>
                    baseAPI
                        .get<IApiResponse<IProject>>(`projects/${projectId}`)
                        .then(response => response.data.data)
                ));

                return combinePortfolioCaseStudy(projects)[0];
            }

            const project = await baseAPI
                .get<IApiResponse<IProject>>(`projects/${id}`)
                .then(r => r.data);

            return project.data;
        },
        [`project:${id}`],
        {
            revalidate: 86400,
            tags: ['projects', `project:${id}`],
        }
    )();
});

export const getProjectById = async (id: number) => {
    return getProjectByIdCached(id);
};
