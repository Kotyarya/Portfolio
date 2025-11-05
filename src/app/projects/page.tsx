import {getProjectsPage} from "@/api/getProjectsPage";
import Projects from "@/components/Projects";
import SkillsPreview from "@/components/SkillsPreview";
import ContactMe from "@/components/ContactMe";

export default async function Page() {

    const {skills, skillsPreview, projectsPreview, projects, contactMe} = await getProjectsPage();

    return (
        <>
            <Projects projects={projects} projectsPreview={projectsPreview}/>
            <SkillsPreview skills={skills} skillsPreview={skillsPreview}/>
            <ContactMe contactMe={contactMe}/>
        </>
    );
}