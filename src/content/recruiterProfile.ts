import type {IBlock, IBlockWhatsNext, ISkill} from '@/types/blocksDataTypes';

export const RECRUITER_HERO: IBlock = {
    subtitle: 'Software Developer',
    title: 'SwiftUI, React & TypeScript',
    text: 'Warsaw · Full-time roles · Available in two weeks',
};

export const RECRUITER_CONTACT: IBlock = {
    subtitle: 'Let’s connect',
    title: 'Open to full-time roles',
    text: 'Available in two weeks for developer roles in Warsaw (office or hybrid) and remote opportunities across Poland.',
};

export const PRIMARY_SKILLS = [
    'Swift',
    'SwiftUI',
    'React',
    'Next.js',
    'TypeScript',
    'NestJS',
    'PostgreSQL',
    'Supabase',
    'Git',
    'Testing',
    'CI/CD',
] as const;

export const SECONDARY_SKILLS = [
    'Express',
    'Prisma',
    'Sequelize',
    'Redux',
    'Tailwind CSS',
    'Figma',
    'C#',
] as const;

const LOCAL_SKILLS: ISkill[] = [
    {id: -1, name: 'SwiftUI', importance: 10, img: '', text: 'Used to build the completed GameSpot iOS application with state-driven views and reusable flows.'},
    {id: -2, name: 'Supabase', importance: 10, img: '', text: 'Used for GameSpot authentication, PostgreSQL data, RLS, Realtime, Storage and Edge Functions.'},
    {id: -3, name: 'Testing', importance: 10, img: '', text: 'Unit, UI and regression testing across the portfolio, GameSpot and full-stack projects.'},
    {id: -4, name: 'Express', importance: 7, img: '', text: 'Used to build the CreateX REST API and its authentication and validation flows.'},
    {id: -5, name: 'Sequelize', importance: 7, img: '', text: 'Used for the CreateX PostgreSQL data model and migrations.'},
    {id: -6, name: 'Redux', importance: 7, img: '', text: 'Used for shared client state in the CreateX frontend.'},
];

const DISPLAY_NAMES: Record<string, string> = {
    'nest.js': 'NestJS',
    'prisma orm': 'Prisma',
    'tailwind': 'Tailwind CSS',
};

const normalized = (name: string) => DISPLAY_NAMES[name.trim().toLowerCase()] ?? name.trim();
const recruiterNames = new Set<string>([...PRIMARY_SKILLS, ...SECONDARY_SKILLS]);

export const withRecruiterSkill = (skill: ISkill): ISkill => ({
    ...skill,
    name: normalized(skill.name),
});

export const curateRecruiterSkills = (skills: ISkill[]): ISkill[] => {
    const byName = new Map(skills.map(skill => {
        const prepared = withRecruiterSkill(skill);
        return [prepared.name.toLowerCase(), prepared] as const;
    }));

    for (const skill of LOCAL_SKILLS) {
        if (!byName.has(skill.name.toLowerCase())) byName.set(skill.name.toLowerCase(), skill);
    }

    return [...PRIMARY_SKILLS, ...SECONDARY_SKILLS]
        .map(name => byName.get(name.toLowerCase()))
        .filter((skill): skill is ISkill => Boolean(skill));
};

export const getLocalRecruiterSkill = (id: number) => LOCAL_SKILLS.find(skill => skill.id === id);
export const isPrimarySkill = (name: string) => PRIMARY_SKILLS.some(skill => skill.toLowerCase() === normalized(name).toLowerCase());
export const isRecruiterSkill = (name: string) => recruiterNames.has(normalized(name));

export const withRecruiterWhatsNext = (block: IBlockWhatsNext): IBlockWhatsNext => ({
    ...block,
    text: 'I’m continuing to deepen my iOS development skills through Swift, SwiftUI, application architecture, testing and complete product delivery.',
    whatsNextList: block.whatsNextList.map(item => (
        item.title.toLowerCase().includes('ios')
            ? {
                ...item,
                title: 'iOS Development',
                subtasksList: [
                    'Deepen Swift and SwiftUI',
                    'Strengthen app architecture',
                    'Expand unit and UI testing',
                    'Improve data-driven app flows',
                    'Ship complete iOS applications',
                ],
            }
            : item
    )) as IBlockWhatsNext['whatsNextList'],
});
