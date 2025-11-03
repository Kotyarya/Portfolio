import {getHomePage} from '@/api/getHomePage';
import Hero from '@/components/Hero';
import AboutMe from '@/components/AboutMe';
import SkillsPreview from "@/components/SkillsPreview";
import ProjectsPreview from "@/components/ProjectsPreview";

export default async function Home() {

    const {hero, aboutMe, skills, skillsPreview, projectsPreview, projects} = await getHomePage();


    return (
        <>
            <Hero hero={hero}/>
            <AboutMe aboutMe={aboutMe}/>
            <SkillsPreview skills={skills} skillsPreview={skillsPreview}/>
            <ProjectsPreview projects={projects} projectsPreview={projectsPreview}/>
        </>
    );
}
