import {getSkillsPage} from "@/api/getSkillsPage";
import ProjectsPreview from "@/components/ProjectsPreview";
import ContactMe from "@/components/ContactMe";
import Skills from "@/components/Skills";
import {getSkillById} from "@/api/getSkills";


interface SkillsSearchParams {
    skillId?: number;
}

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