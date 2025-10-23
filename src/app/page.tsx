import { getHomePage } from '@/api/getHomePage';
import Hero from '@/components/Hero';
import AboutMe from '@/components/AboutMe';

export default async function Home() {

    const {hero, aboutMe} = await getHomePage();


    return (
        <>
            <Hero hero={hero}/>
            <AboutMe aboutMe={aboutMe}/>
        </>
    );
}
