import 'server-only';
import {unstable_cache} from 'next/cache';
import {baseAPI, type IApiResponse} from '@/api/http';
import type {IBlock, IBlockImg, IProject, ISkill} from '@/types/blocksDataTypes';
import {combinePortfolioCaseStudy} from '@/api/portfolioCaseStudy';


export const getHomePage = unstable_cache(
    async () => {
        const [contactMe, projects, projectsPreview, skillsPreview, skills, aboutMe] = await Promise.all([
            baseAPI.get<IApiResponse<IBlock>>('blocks/contact_me').then(r => r.data),
            baseAPI.get<IApiResponse<IProject[]>>('projects').then(r => r.data),
            baseAPI.get<IApiResponse<IBlock>>('blocks/projects_preview').then(r => r.data),
            baseAPI.get<IApiResponse<IBlock>>('blocks/skills_preview').then(r => r.data),
            baseAPI.get<IApiResponse<ISkill[]>>('skills').then(r => r.data),
            baseAPI.get<IApiResponse<IBlockImg>>('blocks/about_me').then(r => r.data),
        ]);

        return {
            aboutMe: aboutMe.data,
            skills: skills.data,
            skillsPreview: skillsPreview.data,
            projects: combinePortfolioCaseStudy(projects.data),
            projectsPreview: projectsPreview.data,
            contactMe: contactMe.data,
        }
    },
    ['home-page'],
    {revalidate: 86400, tags: ['home-page']}
);
