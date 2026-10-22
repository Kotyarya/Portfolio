import {describe, expect, it} from 'vitest';
import {combinePortfolioCaseStudy} from '@/api/portfolioCaseStudy';
import type {IProject} from '@/types/blocksDataTypes';
import sitemap from '@/app/sitemap';
import {buildProjectsQuery, setProjectModalQuery} from '@/utils/projectQuery';
import {hasActiveSearchParams} from '@/utils/queryMetadata';
import {CONTACT_LIMITS, validateContactField} from '@/validation/contact';
import {buildPageMetadata} from '@/utils/siteMetadata';
import {getAnimation} from '@/utils/getAnimation';
import {
    curateRecruiterSkills,
    PRIMARY_SKILLS,
    RECRUITER_CONTACT,
    RECRUITER_HERO,
    SECONDARY_SKILLS,
    withRecruiterWhatsNext,
} from '@/content/recruiterProfile';

const project = (id: number, overrides: Partial<IProject> = {}): IProject => ({
    id,
    name: `Project ${id}`,
    githubLink: '',
    link: '',
    text: 'Project evidence',
    importance: id,
    preview: 'preview.png',
    img: [],
    skills: [],
    category: {name: 'Test'},
    status: {name: 'Finished', img: ''},
    ...overrides,
});

describe('recruiter-facing critical flows', () => {
    it('exposes every primary page through the sitemap', () => {
        expect(sitemap().map(entry => new URL(entry.url).pathname)).toEqual([
            '/', '/about-me', '/skills', '/projects', '/contact', '/privacy',
        ]);
    });

    it('marks query variants active while clean routes remain indexable', () => {
        expect(hasActiveSearchParams({})).toBe(false);
        expect(hasActiveSearchParams({projectId: '13'})).toBe(true);
        expect(hasActiveSearchParams({stacks: []})).toBe(false);
    });

    it('preserves an open project modal while filters change and removes only the modal when closed', () => {
        const filtered = buildProjectsQuery('projectId=12&status=Old', {
            query: 'portfolio',
            category: 'Full-stack',
            stacks: ['Next.js', 'Nest.js'],
        });
        expect(filtered).toContain('projectId=12');
        expect(filtered).toContain('q=portfolio');
        expect(filtered).not.toContain('status=Old');
        expect(setProjectModalQuery(filtered)).not.toContain('projectId');
        expect(setProjectModalQuery(filtered, 6)).toContain('projectId=6');
    });

    it('builds recruiter-ready case studies with honest availability', () => {
        const projects = combinePortfolioCaseStudy([
            project(13, {name: 'Portfolio frontend', githubLink: 'https://github.com/Kotyarya/Portfolio'}),
            project(14, {name: 'Portfolio backend', githubLink: 'https://github.com/Kotyarya/Portfolio-Server'}),
            project(12, {githubLink: 'link'}),
            project(11, {githubLink: 'link'}),
            project(8),
            project(7),
            project(6, {githubLink: 'https://github.com/Kotyarya/Matrix-and-Complex-Numbers-Calculator'}),
        ]);
        const caseStudies = projects.filter(item => item.caseStudy);

        expect(caseStudies).toHaveLength(6);
        expect(caseStudies.every(item => item.caseStudy?.role && item.caseStudy.decisions.length >= 3)).toBe(true);
        expect(projects.find(item => item.name.startsWith('GameSpot'))?.githubLink).toContain('GameSpot');
        expect(projects.find(item => item.name.startsWith('CreateX'))?.link).toContain('vercel.app');
        expect(projects.slice(0, 3).map(item => item.id)).toEqual([13, 1001, 1002]);
        expect(projects[0]?.status.name).toBe('Completed');
        expect(projects.find(item => item.id === 12)?.githubLink).toBe('');
        expect(projects.find(item => item.id === 11)?.externalLinks?.[0]?.label).toBe('View Windows Build');
        expect(projects.find(item => item.id === 8)?.githubLink).toContain('Drawing-and-Presentation');
        expect(projects.find(item => item.id === 7)?.githubLink).toContain('Hermetization--Inheritance');
        expect(projects.find(item => item.id === 6)?.availabilityNote).toContain('public on GitHub');
    });

    it('keeps recruiter positioning concise and removes outdated iOS plans', () => {
        expect(RECRUITER_HERO.title).toContain('SwiftUI');
        expect(RECRUITER_HERO.text).toContain('Warsaw');
        expect(RECRUITER_CONTACT.text).toContain('two weeks');

        const whatsNext = withRecruiterWhatsNext({
            title: 'What’s Next?',
            subtitle: 'Plans ahead',
            text: 'Old text',
            whatsNextList: [{
                title: 'IOS Development',
                imgId: 'ios.svg',
                subtasksList: ['Learn the Basics of Swift'],
            }],
        });

        const copy = JSON.stringify(whatsNext);
        expect(copy).not.toContain('Learn the Basics');
        expect(copy).not.toContain('UIKit');
        expect(copy).toContain('application architecture');
    });

    it('limits the visible skill set to evidence-backed primary and secondary technologies', () => {
        const skills = curateRecruiterSkills([
            {id: 1, name: 'Swift', importance: 10, img: 'swift.svg', text: 'Swift'},
            {id: 2, name: 'Nest.js', importance: 10, img: 'nest.svg', text: 'Nest'},
            {id: 3, name: 'Unreal Engine 5', importance: 10, img: 'unreal.svg', text: 'Unreal'},
        ]);
        const names = skills.map(skill => skill.name);

        expect(names).toContain('SwiftUI');
        expect(names).toContain('Supabase');
        expect(names).toContain('Testing');
        expect(names).toContain('NestJS');
        expect(names).not.toContain('Unreal Engine 5');
        expect([...PRIMARY_SKILLS, ...SECONDARY_SKILLS]).toContain('C#');
    });

    it('applies project filters to the featured recruiter projects', () => {
        const swiftProjects = combinePortfolioCaseStudy([], {skills: ['SwiftUI']});
        const createXSearch = combinePortfolioCaseStudy([], {search: 'online school'});

        expect(swiftProjects.map(item => item.name)).toEqual(['GameSpot — iOS Sports Community']);
        expect(createXSearch.map(item => item.name)).toEqual(['CreateX — Full-Stack Online School']);
    });

    it('matches contact validation to backend field limits', () => {
        expect(validateContactField('name', '')).toBe('Please enter your name');
        expect(validateContactField('email', 'not-an-email')).toBe('Please enter a valid email');
        expect(validateContactField('email', 'recruiter@example.com')).toBe(true);
        expect(validateContactField('message', 'x'.repeat(CONTACT_LIMITS.message + 1))).toBe('Message is too long');
    });

    it('keeps canonical, Open Graph and Twitter metadata aligned', () => {
        const metadata = buildPageMetadata({
            title: 'Projects | Example',
            description: 'Evidence-based project case studies.',
            path: '/projects',
        });

        expect(metadata.alternates).toEqual({canonical: '/projects'});
        expect(metadata.openGraph).toMatchObject({url: '/projects', title: 'Projects | Example'});
        expect(metadata.twitter).toMatchObject({card: 'summary_large_image', title: 'Projects | Example'});
    });

    it('keeps content visible before client-side animation logic runs', () => {
        expect(getAnimation(false, 'animate-fade')).toBe('');
        expect(getAnimation(true, 'animate-fade')).toBe('animate-fade');
    });
});
