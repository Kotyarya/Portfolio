import type {IProject} from '@/types/blocksDataTypes';

const PORTFOLIO_FRONTEND_ID = 13;
const PORTFOLIO_BACKEND_ID = 14;

const evidenceCaseStudies: Record<number, Partial<IProject>> = {
    12: {
        text: 'A finished Unreal Engine 5 endless runner focused on a clear one-input loop, readable hazards and steadily increasing difficulty.',
        availabilityNote: 'Public build and source are not currently available. The published project screenshot is the available evidence.',
        caseStudy: {
            role: 'Personal game project — gameplay concept, interface design and Unreal Engine 5 implementation.',
            challenge: 'Make a simple wall-to-wall bounce mechanic remain readable and progressively harder without adding complex controls.',
            architecture: 'An Unreal Engine 5 gameplay loop built around movement, collision-driven failure, obstacle pacing and score progression.',
            decisions: [
                'Kept the control model intentionally small so timing remains the main skill.',
                'Used progressive difficulty to extend a compact core loop.',
                'Designed the visual direction in Figma before implementing the gameplay presentation.',
            ],
            result: 'Finished portfolio game with a documented gameplay loop and screenshot evidence; no public build or source is currently published.',
        },
    },
    11: {
        text: 'A finished 2D Unreal Engine 5 action game structured around three clans, level progression, combat and skill upgrades.',
        externalLinks: [{
            label: 'View Windows Build',
            url: 'https://github.com/Kotyarya/Cats-Samurai-Whiskers-of-War',
        }],
        availabilityNote: 'A packaged Windows build and project documentation are public. Unreal Engine source files are not published.',
        caseStudy: {
            role: 'Personal game project — game concept, UX/UI and Unreal Engine 5 implementation.',
            challenge: 'Give a compact 2D action game meaningful replay value through distinct clan choices and character progression.',
            architecture: 'An Unreal Engine 5 level flow combining combat encounters, three clan variants and upgrade-driven progression.',
            decisions: [
                'Used three clans to create variation without multiplying the core controls.',
                'Connected upgrades to level progression so combat growth remains visible.',
                'Kept the visual theme and interaction design consistent through a shared Figma direction.',
            ],
            result: 'Finished portfolio game with a public packaged Windows build and project documentation; Unreal Engine source files are not published.',
        },
    },
    8: {
        githubLink: 'https://github.com/Kotyarya/Drawing-and-Presentation-of-Geometric-Solids',
        availabilityNote: 'Source code is public on GitHub. A hosted live demo is not applicable to this Windows Forms desktop application.',
    },
    7: {
        githubLink: 'https://github.com/Kotyarya/Hermetization--Inheritance-and-Polymorphism-on-the-example-of-the-presentation-of-geometric-figures',
        availabilityNote: 'Source code is public on GitHub. A hosted live demo is not applicable to this Windows Forms desktop application.',
    },
    6: {
        text: 'A finished university C# desktop application for matrix and complex-number operations with guarded input and dynamic action states.',
        availabilityNote: 'Source code is public on GitHub. A hosted live demo is not applicable to this Windows Forms desktop application.',
        caseStudy: {
            role: 'University software project — C# implementation, object-oriented model and Windows Forms interaction logic.',
            challenge: 'Support two mathematical domains while preventing invalid operations and keeping the desktop interface understandable.',
            architecture: 'A Windows Forms presentation layer over object-oriented matrix and complex-number operations with UI state validation.',
            decisions: [
                'Separated calculation behavior from the controls that present it.',
                'Enabled and disabled actions dynamically to prevent invalid input paths.',
                'Used typed domain objects instead of placing calculation logic directly in event handlers.',
            ],
            result: 'Finished academic desktop application with public source code demonstrating OOP and defensive UI behavior.',
        },
    },
};

const addEvidenceCaseStudy = (project: IProject): IProject => {
    const evidence = evidenceCaseStudies[project.id];
    if (!evidence) return project;

    return {
        ...project,
        ...evidence,
        link: evidence.link?.startsWith('http')
            ? evidence.link
            : project.link?.startsWith('http') ? project.link : '',
        githubLink: evidence.githubLink?.startsWith('http')
            ? evidence.githubLink
            : project.githubLink?.startsWith('http') ? project.githubLink : '',
    };
};

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

    if (!frontend || !backend) return projects.map(addEvidenceCaseStudy);

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
    ].map(addEvidenceCaseStudy).sort((a, b) => b.importance - a.importance);
};
