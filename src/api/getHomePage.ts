import 'server-only';
import { unstable_cache } from 'next/cache';
import { baseAPI, type IApiResponse } from '@/api/http';
import type { IBlock, IBlockImg } from '@/types/homeTypes';


export const getHomePage = unstable_cache(
    async () => {
        const [aboutMe, hero] = await Promise.all([
            baseAPI.get<IApiResponse<IBlockImg>>('blocks/about_me').then(r => r.data),
            baseAPI.get<IApiResponse<IBlock>>('blocks/hero').then(r => r.data),
        ]);

        return {
            hero: hero.data,
            aboutMe: aboutMe.data,
        }
    },
    ['blocks'],
    {revalidate: 60, tags: ['blocks']}
);