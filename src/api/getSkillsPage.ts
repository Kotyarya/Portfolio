import 'server-only';
import {unstable_cache} from 'next/cache';
import {baseAPI, type IApiResponse} from '@/api/http';
import type {IBlock, IProject, ISkill} from '@/types/blocksDataTypes';


export const getSkillsPage = unstable_cache(
    async () => {
        const [contactMe, projectsPreview, projects, skillsPreview, skills] = await Promise.all([
            baseAPI.get<IApiResponse<IBlock>>('blocks/contact_me').then(r => r.data),
            baseAPI.get<IApiResponse<IBlock>>('blocks/projects_preview').then(r => r.data),
            baseAPI.get<IApiResponse<IProject[]>>('projects').then(r => r.data),
            baseAPI.get<IApiResponse<IBlock>>('blocks/skills_preview').then(r => r.data),
            baseAPI.get<IApiResponse<ISkill[]>>('skills').then(r => r.data),
        ]);

        return {
            skills: skills.data,
            skillsPreview: skillsPreview.data,
            projects: projects.data,
            projectsPreview: projectsPreview.data,
            contactMe: contactMe.data,
        }
    },
    ['blocks'],
    {revalidate: 5, tags: ['blocks']}
);