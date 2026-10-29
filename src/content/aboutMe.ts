import type {IBlockImg} from '@/types/blocksDataTypes';

export const CURRENT_ABOUT_ME_TEXT = 'Hi! I’m Max, a software developer in Warsaw working with SwiftUI, React, TypeScript, NestJS and PostgreSQL. I built GameSpot as a completed diploma and portfolio project using Swift 6, SwiftUI, MapKit and Supabase. I focus on accessible interfaces, clear architecture, testing and reliable delivery.';

export const withCurrentAboutMe = (aboutMe: IBlockImg): IBlockImg => ({
    ...aboutMe,
    text: CURRENT_ABOUT_ME_TEXT,
});
