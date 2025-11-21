import 'server-only';
import {unstable_cache} from 'next/cache';
import {baseAPI, type IApiResponse} from '@/api/http';
import type {IBlock, IBlockCertificates, IBlockImg, IBlockWhatsNext, IProject, ISkill} from '@/types/blocksDataTypes';


export const getAboutMePage = unstable_cache(
    async () => {
        const [whatsNext, certificates, contactMe, projects, projectsPreview, skillsPreview, skills, aboutMe] = await Promise.all([
            baseAPI.get<IApiResponse<IBlockWhatsNext>>('blocks/whats_next').then(r => r.data),
            baseAPI.get<IApiResponse<IBlockCertificates>>('blocks/certificates').then(r => r.data),
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
            projects: projects.data,
            projectsPreview: projectsPreview.data,
            contactMe: contactMe.data,
            certificates: certificates.data,
            whatsNext: whatsNext.data,
        }
    },
    ['blocks'],
    {revalidate: 5, tags: ['blocks']}
);