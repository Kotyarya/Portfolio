import {describe, expect, it} from 'vitest';
import {combinePortfolioCaseStudy} from '@/api/portfolioCaseStudy';
import type {IProject} from '@/types/blocksDataTypes';
import sitemap from '@/app/sitemap';
import {buildProjectsQuery, setProjectModalQuery} from '@/utils/projectQuery';
import {hasActiveSearchParams} from '@/utils/queryMetadata';
import {CONTACT_LIMITS, validateContactField} from '@/validation/contact';
import {buildPageMetadata} from '@/utils/siteMetadata';
import {getAnimation} from '@/utils/getAnimation';

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

    it('builds four evidence-based case studies with honest availability', () => {
        const projects = combinePortfolioCaseStudy([
            project(13, {name: 'Portfolio frontend', githubLink: 'https://github.com/Kotyarya/Portfolio'}),
            project(14, {name: 'Portfolio backend', githubLink: 'https://github.com/Kotyarya/Portfolio-Server'}),
            project(12, {githubLink: 'link'}),
            project(11, {githubLink: 'link'}),
            project(6, {githubLink: 'https://github.com/Kotyarya/Matrix-and-Complex-Numbers-Calculator'}),
        ]);
        const caseStudies = projects.filter(item => item.caseStudy);

        expect(caseStudies).toHaveLength(4);
        expect(caseStudies.every(item => item.caseStudy?.role && item.caseStudy.decisions.length >= 3)).toBe(true);
        expect(projects.find(item => item.id === 12)?.githubLink).toBe('');
        expect(projects.find(item => item.id === 6)?.availabilityNote).toContain('public on GitHub');
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
