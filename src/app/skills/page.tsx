import {getSkillsPage} from "@/api/getSkillsPage";
import ProjectsPreview from "@/components/ProjectsPreview";
import ContactMe from "@/components/ContactMe";
import Skills from "@/components/Skills";
import {getSkillById} from "@/api/getSkills";
import type {Metadata} from "next";


interface SkillsSearchParams {
    skillId?: number;
}

export const metadata: Metadata = {
    title: "Skills — Maksym Aksamitnyi",
    description:
        "Technical skills of Maksym Aksamitnyi, including web development, frontend and backend technologies.",
};

export default async function Page({searchParams}: { searchParams: SkillsSearchParams }) {

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