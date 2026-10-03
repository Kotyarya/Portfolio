import {getSkillsPage} from "@/api/getSkillsPage";
import ContactMe from "@/components/ContactMe";
import Skills from "@/components/Skills";
import {getSkillById} from "@/api/getSkills";
import type {Metadata} from "next";
import {hasActiveSearchParams} from '@/utils/queryMetadata';
import Link from 'next/link';


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

    const {skills, skillsPreview, contactMe} = await getSkillsPage();
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
            <section className="mx-auto flex w-[90vw] max-w-3xl flex-col items-center gap-5 rounded-lg border border-gold-500/40 bg-black-300 px-6 py-10 text-center">
                <p className="font-taviraj text-4xs uppercase tracking-[2px] text-gold-500">Applied work</p>
                <h2 className="font-cinzel text-xl font-bold text-gold-primary">See these skills in real projects</h2>
                <p className="max-w-2xl font-lora text-2xs leading-relaxed text-white">
                    Project case studies show the problem, my role, technical decisions and the result behind the stack.
                </p>
                <Link href="/projects" className="rounded border border-gold-primary px-6 py-3 font-taviraj text-2xs text-gold-primary transition hover:bg-gold-primary hover:text-black-primary">
                    View project evidence
                </Link>
            </section>
            <ContactMe contactMe={contactMe}/>
        </>
    );
}
