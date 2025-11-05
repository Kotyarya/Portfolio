import 'server-only';
import {unstable_cache} from 'next/cache';
import {baseAPI, type IApiResponse} from '@/api/http';
import type {IBlock, ISkill} from '@/types/blocksDataTypes';


export const getProjectsPage = unstable_cache(
    async () => {
        const [contactMe, projectsPreview, skillsPreview, skills] = await Promise.all([
            baseAPI.get<IApiResponse<IBlock>>('blocks/contact_me').then(r => r.data),
            baseAPI.get<IApiResponse<IBlock>>('blocks/projects_preview').then(r => r.data),
            baseAPI.get<IApiResponse<IBlock>>('blocks/skills_preview').then(r => r.data),
            baseAPI.get<IApiResponse<ISkill[]>>('skills').then(r => r.data),
        ]);

        return {
            skills: skills.data,
            skillsPreview: skillsPreview.data,
            projectsPreview: projectsPreview.data,
            contactMe: contactMe.data,
        }
    },
    ['blocks'],
    {revalidate: 5, tags: ['blocks']}
);