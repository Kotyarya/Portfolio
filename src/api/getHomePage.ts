import 'server-only';
import {unstable_cache} from 'next/cache';
import {baseAPI, type IApiResponse} from '@/api/http';
import type {IBlock, IBlockImg, IProject, ISkill} from '@/types/blocksDataTypes';
import {combinePortfolioCaseStudy} from '@/api/portfolioCaseStudy';
import {withCurrentAboutMe} from '@/content/aboutMe';
import {curateRecruiterSkills, RECRUITER_CONTACT, RECRUITER_HERO} from '@/content/recruiterProfile';

interface HomePagePayload {
    hero: IBlock;
    aboutMe: IBlockImg;
    skills: ISkill[];
    skillsPreview: IBlock;
    projects: IProject[];
    projectsPreview: IBlock;
    contactMe: IBlock;
}


export const getHomePage = unstable_cache(
    async () => {
        const response = await baseAPI.get<IApiResponse<HomePagePayload>>('home').then(r => r.data);
        const {hero, contactMe, projects, projectsPreview, skillsPreview, skills, aboutMe} = response.data;

        return {
            hero: {...hero, ...RECRUITER_HERO},
            aboutMe: withCurrentAboutMe(aboutMe),
            skills: curateRecruiterSkills(skills),
            skillsPreview,
            projects: combinePortfolioCaseStudy(projects),
            projectsPreview,
            contactMe: {...contactMe, ...RECRUITER_CONTACT},
        }
    },
    ['home-page-recruiter-v1'],
    {revalidate: 86400, tags: ['home-page']}
);
