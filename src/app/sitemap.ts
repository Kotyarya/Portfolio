import type {MetadataRoute} from 'next';

const BASE_URL = 'https://aksamitny.com';
const LAST_CONTENT_UPDATE = new Date('2026-10-03T00:00:00.000Z');

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: BASE_URL,
            lastModified: LAST_CONTENT_UPDATE,
            changeFrequency: 'weekly',
            priority: 1,
        },
        ...[
            {path: '/about-me', priority: 0.8},
            {path: '/skills', priority: 0.8},
            {path: '/projects', priority: 0.9},
            {path: '/contact', priority: 0.7},
            {path: '/privacy', priority: 0.4},
        ].map(({path, priority}) => ({
            url: `${BASE_URL}${path}`,
            lastModified: LAST_CONTENT_UPDATE,
            changeFrequency: 'monthly' as const,
            priority,
        })),
    ];
}
