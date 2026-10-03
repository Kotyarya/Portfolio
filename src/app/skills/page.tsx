import {getSkillsPage} from "@/api/getSkillsPage";
import ProjectsPreview from "@/components/ProjectsPreview";
import ContactMe from "@/components/ContactMe";
import Skills from "@/components/Skills";
import {getSkillById} from "@/api/getSkills";
import type {Metadata} from "next";
import {hasActiveSearchParams} from '@/utils/queryMetadata';


interface SkillsSearchParams {
    skillId?: number;
}

const pageMetadata: Metadata = {
    title: "Skills — Maksym Aksamitnyi",
    description:
        "Technical skills of Maksym Aksamitnyi, including web development, frontend and backend technologies.",
    alternates: {canonical: '/skills'},
};

export async function generateMetadata({searchParams}: {searchParams: Promise<SkillsSearchParams>}): Promise<Metadata> {
    const params = await searchParams;
    const hasQuery = hasActiveSearchParams(params);

    return hasQuery
        ? {...pageMetadata, robots: {index: false, follow: true}}
        : pageMetadata;
}

export default async function Page({searchParams}: { searchParams: Promise<SkillsSearchParams> }) {

    const {skills, skillsPreview, projectsPreview, projects, contactMe} = await getSkillsPage();
    const params = await searchParams;

    const {skillId} = params;

    let skill;

    if (skillId) {
        skill = await getSkillById(skillId);
    } else {
        skill = undefined;
    }

    return (
        <>
            <Skills skills={skills} skillsPreview={skillsPreview} activeSkill={skill} skillId={skillId}/>
            <ProjectsPreview projects={projects} projectsPreview={projectsPreview}/>
            <ContactMe contactMe={contactMe}/>
        </>
    );
}
