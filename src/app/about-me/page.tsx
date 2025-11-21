import AboutMe from '@/components/AboutMe';
import SkillsPreview from "@/components/SkillsPreview";
import ProjectsPreview from "@/components/ProjectsPreview";
import ContactMe from "@/components/ContactMe";
import {getAboutMePage} from "@/api/getAboutMePage";
import WhatsNext from "@/components/WhatsNext";
import Certificates from "@/components/Certificates";

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
            <AboutMe aboutMe={aboutMe}/>
            <WhatsNext whatsNext={whatsNext}/>
            <Certificates certificates={certificates}/>
            <SkillsPreview skills={skills} skillsPreview={skillsPreview}/>
            <ProjectsPreview projects={projects} projectsPreview={projectsPreview}/>
            <ContactMe contactMe={contactMe}/>
        </>
    );
}
