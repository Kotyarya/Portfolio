import type {IProject} from '@/types/blocksDataTypes';

const PORTFOLIO_FRONTEND_ID = 13;
const PORTFOLIO_BACKEND_ID = 14;
export const GAMESPOT_PROJECT_ID = 1001;
export const CREATEX_PROJECT_ID = 1002;

export const featuredPortfolioProjects: IProject[] = [
    {
        id: GAMESPOT_PROJECT_ID,
        name: 'GameSpot — iOS Sports Community',
        githubLink: 'https://github.com/Kotyarya/GameSpot',
        externalLinks: [{
            label: 'View Documentation',
            url: 'https://github.com/Kotyarya/GameSpot#readme',
        }],
        link: '',
        availabilityNote: 'The complete source, architecture documentation and test evidence are public. App Store distribution is intentionally outside the current portfolio scope.',
        text: 'A native SwiftUI app for discovering outdoor courts, organizing games, managing teams, voting for MVPs and tracking sport-specific ratings.',
        importance: 99,
        preview: '/projects/gamespot/gamespot-cover.webp',
        img: [],
        imageFit: 'contain',
        skills: [
            {name: 'Swift', importance: 10},
            {name: 'SwiftUI', importance: 10},
            {name: 'iOS', importance: 10},
            {name: 'Supabase', importance: 9},
            {name: 'PostgreSQL', importance: 9},
            {name: 'MapKit', importance: 8},
            {name: 'REST API', importance: 7},
            {name: 'Git', importance: 6},
        ],
        category: {name: 'Mobile'},
        status: {name: 'Finished', img: ''},
        caseStudy: {
            role: 'Solo iOS and backend developer — product flows, SwiftUI architecture, Supabase data model, security rules and verification.',
            challenge: 'Coordinate real-world games and player state while keeping permissions, team capacity, voting and account cleanup reliable across multiple users.',
            architecture: 'SwiftUI views → @MainActor view models → protocol-based services → Supabase Auth, Postgres, RPC, RLS, Realtime, Storage and Edge Functions.',
            decisions: [
                'Kept ownership and match lifecycle rules in PostgreSQL functions instead of trusting client state.',
                'Treated Realtime messages as invalidation signals and reloaded authoritative data after events.',
                'Built deterministic previews, XCTest coverage, XCUITest journeys and SQL regression checks around critical flows.',
            ],
            result: 'A finished portfolio application with public source, reproducible backend migrations, documented architecture and verified release builds.',
        },
    },
    {
        id: CREATEX_PROJECT_ID,
        name: 'CreateX — Full-Stack Online School',
        githubLink: 'https://github.com/Kotyarya/CreateX',
        githubLinks: [
            {label: 'Frontend', url: 'https://github.com/Kotyarya/CreateX'},
            {label: 'Backend', url: 'https://github.com/Kotyarya/CreateX-API'},
        ],
        externalLinks: [{label: 'View Documentation', url: 'https://github.com/Kotyarya/CreateX#readme'}],
        link: 'https://createx-maksym-aksamitnyi.vercel.app',
        availabilityNote: 'The live demo and both source repositories are public. The API may need a brief first-request warm-up on the free hosting tier.',
        text: 'A responsive online-school platform with catalogues, detail pages, account access, registration flows and database-backed content.',
        importance: 98,
        preview: '/projects/createx/createx-home.webp',
        img: [
            '/projects/createx/createx-courses.webp',
            '/projects/createx/createx-events-home.webp',
            '/projects/createx/createx-events.webp',
            '/projects/createx/createx-blog.webp',
        ],
        imageFit: 'contain',
        skills: [
            {name: 'React', importance: 10},
            {name: 'TypeScript', importance: 10},
            {name: 'Node.js', importance: 9},
            {name: 'PostgreSQL', importance: 9},
            {name: 'REST API', importance: 9},
            {name: 'SCSS', importance: 8},
            {name: 'Redux', importance: 8},
            {name: 'Express', importance: 8},
        ],
        category: {name: 'Full-stack'},
        status: {name: 'Completed', img: ''},
        caseStudy: {
            role: 'Solo full-stack developer — responsive frontend, API integration, authentication, content model, deployment and production hardening.',
            challenge: 'Turn a large multi-page education design into a working product with reusable catalogue flows, forms and safely hosted demo data.',
            architecture: 'React and Redux SPA on Vercel → Express REST API on Render → PostgreSQL through Sequelize, with static media served by the API.',
            decisions: [
                'Used shared catalogue and detail flows for courses, events and blog content.',
                'Protected content mutations with JWT roles while keeping public browsing read-only.',
                'Added validation, explicit CORS, rate limits and fail-closed environment checks before deployment.',
            ],
            result: 'A deployed full-stack portfolio demo with public frontend/backend repositories, CI checks, seeded content and working recruiter-facing flows.',
        },
    },
];

export const getFeaturedPortfolioProject = (id: number) => (
    featuredPortfolioProjects.find(project => project.id === id)
);

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
        githubLink: '',
        availabilityNote: 'The source repository is private. A hosted live demo is not applicable to this Windows Forms desktop application.',
    },
    7: {
        githubLink: '',
        availabilityNote: 'The source repository is private. A hosted live demo is not applicable to this Windows Forms desktop application.',
    },
    6: {
        githubLink: '',
        text: 'A finished university C# desktop application for matrix and complex-number operations with guarded input and dynamic action states.',
        availabilityNote: 'The source repository is private. A hosted live demo is not applicable to this Windows Forms desktop application.',
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

    const hasGithubOverride = Object.prototype.hasOwnProperty.call(evidence, 'githubLink');

    return {
        ...project,
        ...evidence,
        link: evidence.link?.startsWith('http')
            ? evidence.link
            : project.link?.startsWith('http') ? project.link : '',
        githubLink: hasGithubOverride
            ? evidence.githubLink?.startsWith('http') ? evidence.githubLink : ''
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

interface ProjectPresentationOptions {
    category?: string;
    skills?: string[];
    status?: string;
    search?: string;
    includeFeatured?: boolean;
}

const matchesFeaturedProject = (
    project: IProject,
    {category = '', skills = [], status = '', search = ''}: ProjectPresentationOptions,
) => {
    const normalizedSearch = search.trim().toLowerCase();
    const projectSkills = new Set(project.skills.map(skill => skill.name.toLowerCase()));
    const searchableText = [
        project.name,
        project.text,
        project.category.name,
        ...project.skills.map(skill => skill.name),
        project.caseStudy?.role,
        project.caseStudy?.challenge,
        project.caseStudy?.architecture,
        project.caseStudy?.result,
    ].filter(Boolean).join(' ').toLowerCase();

    return (!category || project.category.name.toLowerCase() === category.toLowerCase())
        && (!status || project.status.name.toLowerCase() === status.toLowerCase())
        && skills.every(skill => projectSkills.has(skill.toLowerCase()))
        && (!normalizedSearch || searchableText.includes(normalizedSearch));
};

export const combinePortfolioCaseStudy = (
    projects: IProject[],
    options: ProjectPresentationOptions = {},
): IProject[] => {
    const frontend = projects.find(project => project.id === PORTFOLIO_FRONTEND_ID);
    const backend = projects.find(project => project.id === PORTFOLIO_BACKEND_ID);
    const preparedProjects = frontend && backend
        ? [{
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
            externalLinks: [
                {label: 'Frontend README', url: 'https://github.com/Kotyarya/Portfolio#readme'},
                {label: 'Backend README', url: 'https://github.com/Kotyarya/Portfolio-Server#readme'},
            ],
            category: {name: 'Full-stack'},
            status: {name: 'Completed', img: ''},
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
                result: 'A live full-stack portfolio at aksamitny.com with one content source, responsive recruiter flows and focused security controls.',
            },
        } satisfies IProject,
        ...projects.filter(project => project.id !== PORTFOLIO_FRONTEND_ID && project.id !== PORTFOLIO_BACKEND_ID)]
        : projects;

    const featured = options.includeFeatured === false
        ? []
        : featuredPortfolioProjects.filter(project => matchesFeaturedProject(project, options));

    const primaryRank = (project: IProject) => {
        if (project.id === PORTFOLIO_FRONTEND_ID) return 0;
        if (project.id === GAMESPOT_PROJECT_ID) return 1;
        if (project.id === CREATEX_PROJECT_ID) return 2;
        return 3;
    };

    return [...featured, ...preparedProjects]
        .map(addEvidenceCaseStudy)
        .sort((a, b) => primaryRank(a) - primaryRank(b) || b.importance - a.importance);
};
