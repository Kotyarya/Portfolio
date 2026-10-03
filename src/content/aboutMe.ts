import type {IBlockImg} from '@/types/blocksDataTypes';

export const CURRENT_ABOUT_ME_TEXT = 'Hi! I’m Max, a full-stack developer building production web products with Next.js, React, NestJS and PostgreSQL. I also build iOS apps with Swift and SwiftUI, including GameSpot, and have experience with C# desktop applications. I focus on accessible interfaces, clear architecture, testing and reliable delivery.';

export const withCurrentAboutMe = (aboutMe: IBlockImg): IBlockImg => ({
    ...aboutMe,
    text: CURRENT_ABOUT_ME_TEXT,
});
