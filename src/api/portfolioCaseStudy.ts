import 'server-only';
import type {IProject} from '@/types/blocksDataTypes';

const PORTFOLIO_FRONTEND_ID = 13;
const PORTFOLIO_BACKEND_ID = 14;

const mergeSkills = (projects: IProject[]) => {
    const skills = new Map<string, {name: string; importance: number}>();

    for (const project of projects) {
        for (const skill of project.skills) {
            const current = skills.get(skill.name);
            if (!current || skill.importance > current.importance) {
                skills.set(skill.name, skill);
            }
        }
    }

    return [...skills.values()].sort((a, b) => b.importance - a.importance);
};

export const combinePortfolioCaseStudy = (projects: IProject[]): IProject[] => {
    const frontend = projects.find(project => project.id === PORTFOLIO_FRONTEND_ID);
    const backend = projects.find(project => project.id === PORTFOLIO_BACKEND_ID);

    if (!frontend || !backend) return projects;

    const caseStudy: IProject = {
        ...frontend,
        name: 'Portfolio Website — Full-Stack Case Study',
        text: 'Designed and built an end-to-end portfolio platform with an accessible Next.js interface, a secured NestJS API, PostgreSQL content storage, and automated Vercel and Render deployments.',
        importance: 100,
        link: 'https://aksamitny.com',
        githubLink: 'https://github.com/Kotyarya/Portfolio',
        githubLinks: [
            {label: 'Frontend', url: 'https://github.com/Kotyarya/Portfolio'},
            {label: 'Backend', url: 'https://github.com/Kotyarya/Portfolio-Server'},
        ],
        category: {name: 'Full-stack'},
        skills: mergeSkills([frontend, backend]),
        img: [...new Set([...frontend.img, backend.preview, ...backend.img])],
        caseStudy: {
            role: 'Solo full-stack developer — product structure, UI, API, data model, security and deployment.',
            challenge: 'Turn editable portfolio content into a fast recruiter-facing experience without exposing private API access or weakening the contact channel.',
            architecture: 'Next.js App Router on Vercel → server-only NestJS REST API on Render → PostgreSQL through Prisma.',
            decisions: [
                'Server-rendered content with optimized responsive images.',
                'Fail-closed API key protection and strict DTO validation.',
                'Rate-limited contact flow with safe user feedback.',
                'Independent frontend and backend deployments for focused releases.',
            ],
            result: 'A live full-stack product at aksamitny.com with one content source, responsive recruiter flows, and focused security controls.',
        },
    };

    return [
        caseStudy,
        ...projects.filter(project => project.id !== PORTFOLIO_FRONTEND_ID && project.id !== PORTFOLIO_BACKEND_ID),
    ].sort((a, b) => b.importance - a.importance);
};
