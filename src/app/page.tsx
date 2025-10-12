import { getHomePage } from '@/api/getHomePage';
import Hero from '@/components/Hero';

export default async function Home() {

    const {hero, aboutMe} = await getHomePage();

    return (
        <>
            <Hero hero={hero} />
        </>
    );
}
