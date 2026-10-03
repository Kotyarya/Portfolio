import Contact from "@/components/Contact";
import type {Metadata} from "next";
import {buildPageMetadata} from '@/utils/siteMetadata';

export const metadata: Metadata = buildPageMetadata({
    title: 'Contact Maksym Aksamitnyi | Full-Stack Developer',
    description: 'Contact full-stack TypeScript developer Maksym Aksamitnyi about software engineering roles, freelance work or product collaboration.',
    path: '/contact',
});

export default async function Page() {

    return (
        <>
            <Contact/>
        </>
    );
}
