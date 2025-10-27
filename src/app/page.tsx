import {getHomePage} from '@/api/getHomePage';
import Hero from '@/components/Hero';
import AboutMe from '@/components/AboutMe';
import SkillsPreview from "@/components/SkillsPreview";

export default async function Home() {

    const {hero, aboutMe, skills, skillsPreview} = await getHomePage();


    return (
        <>
            <Hero hero={hero}/>
            <AboutMe aboutMe={aboutMe}/>
            <SkillsPreview skills={skills} skillsPreview={skillsPreview}/>
        </>
    );
}
