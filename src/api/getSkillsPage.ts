import 'server-only';
import {unstable_cache} from 'next/cache';
import {baseAPI, type IApiResponse} from '@/api/http';
import type {IBlock, ISkill} from '@/types/blocksDataTypes';
import {curateRecruiterSkills, RECRUITER_CONTACT} from '@/content/recruiterProfile';


export const getSkillsPage = unstable_cache(
    async () => {
        const [contactMe, skillsPreview, skills] = await Promise.all([
            baseAPI.get<IApiResponse<IBlock>>('blocks/contact_me').then(r => r.data),
            baseAPI.get<IApiResponse<IBlock>>('blocks/skills_preview').then(r => r.data),
            baseAPI.get<IApiResponse<ISkill[]>>('skills').then(r => r.data),
        ]);

        return {
            skills: curateRecruiterSkills(skills.data),
            skillsPreview: skillsPreview.data,
            contactMe: {...contactMe.data, ...RECRUITER_CONTACT},
        }
    },
    ['skills-page-recruiter-v1'],
    {revalidate: 86400, tags: ['skills-page']}
);
