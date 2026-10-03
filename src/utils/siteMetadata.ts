import type {Metadata} from 'next';

const SITE_NAME = 'Maksym Aksamitnyi — Full-Stack Developer';
const SOCIAL_IMAGE = {
    url: '/opengraph-image',
    width: 1200,
    height: 630,
    alt: 'Maksym Aksamitnyi — Full-Stack TypeScript Developer',
};

interface PageMetadataOptions {
    title: string;
    description: string;
    path: `/${string}` | '/';
}

export const buildPageMetadata = ({title, description, path}: PageMetadataOptions): Metadata => ({
    title,
    description,
    alternates: {canonical: path},
    openGraph: {
        title,
        description,
        url: path,
        siteName: SITE_NAME,
        type: 'website',
        locale: 'en_US',
        images: [SOCIAL_IMAGE],
    },
    twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [SOCIAL_IMAGE.url],
    },
});
