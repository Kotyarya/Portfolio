import Contact from "@/components/Contact";
import type {Metadata} from "next";
import {buildPageMetadata} from '@/utils/siteMetadata';

export const metadata: Metadata = buildPageMetadata({
    title: 'Contact Maksym Aksamitnyi | Software Developer in Warsaw',
    description: 'Contact Warsaw-based software developer Maksym Aksamitnyi about full-time React, TypeScript, NestJS or SwiftUI roles in Poland.',
    path: '/contact',
});

export default async function Page() {

    return (
        <>
            <Contact/>
        </>
    );
}
