import 'server-only';
import {unstable_cache} from 'next/cache';
import {baseAPI, type IApiResponse} from '@/api/http';
import type {IBlock, IBlockImg, IProject, ISkill} from '@/types/blocksDataTypes';
import {combinePortfolioCaseStudy} from '@/api/portfolioCaseStudy';
import {withCurrentAboutMe} from '@/content/aboutMe';

interface HomePagePayload {
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
        const {contactMe, projects, projectsPreview, skillsPreview, skills, aboutMe} = response.data;

        return {
            aboutMe: withCurrentAboutMe(aboutMe),
            skills,
            skillsPreview,
            projects: combinePortfolioCaseStudy(projects),
            projectsPreview,
            contactMe,
        }
    },
    ['home-page'],
    {revalidate: 86400, tags: ['home-page']}
);
