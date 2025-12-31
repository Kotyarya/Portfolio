import 'server-only';
import {unstable_cache} from 'next/cache';
import {baseAPI, type IApiResponse} from "@/api/http";
import type {IProject} from "@/types/blocksDataTypes";

type ProjectSkill = { name: string; importance: number };
type ProjectCategory = { name: string };
type ProjectStatus = { name: string };


const getProjectCached = unstable_cache(
    async (category: string, skills: string[], status: string, search: string) => {
        const skillsParam = skills.length
            ? `&skills=${skills.map(skill => encodeURIComponent(skill)).join("&skills=")}&skills=`
            : "";

        console.log(skillsParam);

        const projects = await baseAPI
            .get<IApiResponse<IProject[]>>(
                `projects?category=${category}&status=${status}&search=${search}${skillsParam}`
            )
            .then(r => r.data);

        return projects.data;
    },
    ['projects-list'],
    {
        revalidate: 5,
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

        return projects.data;
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
        revalidate: 5,     // раз в час
        tags: ['projects-filters'],
    }
);

export const getProjectsFilterParam = async () => {
    return getProjectsFilterParamCached();
};


const getProjectByIdCached = unstable_cache(
    async (id: number) => {
        const project = await baseAPI
            .get<IApiResponse<IProject>>(`projects/${id}`)
            .then(r => r.data);

        return project.data;
    },
    ['project-by-id'],
    {
        revalidate: 5,
        tags: ['projects'],
    }
);

export const getProjectById = async (id: number) => {
    return getProjectByIdCached(id);
};