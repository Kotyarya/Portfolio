import {getHomePage} from '@/api/getHomePage';
import Hero from '@/components/Hero';
import AboutMe from '@/components/AboutMe';
import SkillsPreview from "@/components/SkillsPreview";
import ProjectsPreview from "@/components/ProjectsPreview";
import ContactMe from "@/components/ContactMe";

export default async function Home() {

    const {aboutMe, skills, skillsPreview, projectsPreview, projects, contactMe} = await getHomePage();


    return (
        <>
            <Hero/>
            <AboutMe aboutMe={aboutMe}/>
            <SkillsPreview skills={skills} skillsPreview={skillsPreview}/>
            <ProjectsPreview projects={projects} projectsPreview={projectsPreview}/>
            <ContactMe contactMe={contactMe}/>
        </>
    );
}
