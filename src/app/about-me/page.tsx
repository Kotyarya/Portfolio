import AboutMe from '@/components/AboutMe';
import SkillsPreview from "@/components/SkillsPreview";
import ProjectsPreview from "@/components/ProjectsPreview";
import ContactMe from "@/components/ContactMe";
import {getAboutMePage} from "@/api/getAboutMePage";
import WhatsNext from "@/components/WhatsNext";
import Certificates from "@/components/Certificates";
import type {Metadata} from "next";
import {buildPageMetadata} from '@/utils/siteMetadata';

export const metadata: Metadata = buildPageMetadata({
    title: 'About Maksym Aksamitnyi | Software Developer in Warsaw',
    description: 'Meet Maksym Aksamitnyi, a Warsaw-based software developer working with SwiftUI, React, TypeScript, NestJS, PostgreSQL and Supabase.',
    path: '/about-me',
});

export default async function Page() {

    const {
        whatsNext,
        contactMe,
        aboutMe,
        skills,
        skillsPreview,
        projectsPreview,
        projects,
        certificates
    } = await getAboutMePage();

    return (
        <>
            <AboutMe aboutMe={aboutMe} headingLevel={1}/>
            <WhatsNext whatsNext={whatsNext}/>
            <Certificates certificates={certificates}/>
            <SkillsPreview skills={skills} skillsPreview={skillsPreview}/>
            <ProjectsPreview projects={projects} projectsPreview={projectsPreview}/>
            <ContactMe contactMe={contactMe}/>
        </>
    );
}
