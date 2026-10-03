"use client";

import React from 'react';
import Image from 'next/image';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import type {IBlock, ISkill} from '@/types/blocksDataTypes';
import Title from '@/ui/Title';
import SkillModal from '@/components/SkillModal';
import {useInView} from '@/hooks/useInView';
import {getAnimation} from '@/utils/getAnimation';

interface SkillsProps {
    skillsPreview: IBlock;
    skills: ISkill[];
    skillId?: number;
    activeSkill?: ISkill;
}

const categories = [
    {
        name: 'Frontend',
        description: 'Interfaces, rendering, responsive behavior and technical SEO.',
        matches: ['react', 'next', 'typescript', 'javascript', 'html', 'css', 'tailwind', 'seo', 'ux', 'ui'],
    },
    {
        name: 'Backend & Data',
        description: 'APIs, application logic, persistence and data access.',
        matches: ['nest', 'node', 'postgres', 'prisma', 'rest', 'sql', 'postman'],
    },
    {
        name: 'Software & Game Development',
        description: 'Object-oriented desktop software and interactive game systems.',
        matches: ['swift', 'swiftui', 'ios', 'c#', 'windows forms', 'unreal', 'algorithm'],
    },
    {
        name: 'Delivery & Collaboration',
        description: 'Source control, design handoff and project delivery tools.',
        matches: ['git', 'github', 'figma', 'jira', 'trello', 'notion'],
    },
] as const;

const categoryFor = (skill: ISkill) => {
    const normalizedName = skill.name.toLowerCase();
    return categories.find(category => category.matches.some(match => normalizedName.includes(match)))?.name
        ?? 'Additional Skills';
};

const Skills = ({skillsPreview, skills, activeSkill, skillId}: SkillsProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const {isVisible, ref} = useInView<HTMLDivElement>();

    const groupedSkills = React.useMemo(() => {
        const groups = new Map<string, ISkill[]>();

        for (const skill of [...skills].sort((a, b) => b.importance - a.importance)) {
            const category = categoryFor(skill);
            groups.set(category, [...(groups.get(category) ?? []), skill]);
        }

        return [
            ...categories.map(category => ({
                ...category,
                skills: groups.get(category.name) ?? [],
            })).filter(category => category.skills.length > 0),
            ...(groups.has('Additional Skills') ? [{
                name: 'Additional Skills',
                description: 'Supporting technologies used across academic and personal projects.',
                matches: [],
                skills: groups.get('Additional Skills') ?? [],
            }] : []),
        ];
    }, [skills]);

    const openModal = (id: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('skillId', id.toString());
        router.push(`${pathname}?${params.toString()}`, {scroll: false});
    };

    const closeModal = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('skillId');
        const query = params.toString();
        router.push(query ? `${pathname}?${query}` : pathname, {scroll: false});
    };

    return (
        <>
            {skillId && <SkillModal activeSkill={activeSkill} closeModal={closeModal}/>}
            <section className="mx-auto mt-20 flex w-[90vw] max-w-6xl flex-col items-center gap-12" ref={ref}>
                <div className={`flex max-w-3xl flex-col items-center gap-5 text-center ${getAnimation(isVisible, 'animate-slide-in-bottom')}`}>
                    <Title title={skillsPreview.title} subtitle={skillsPreview.subtitle} headingLevel={1}/>
                    <p className="font-lora text-2xs leading-relaxed text-white laptop:text-sm">{skillsPreview.text}</p>
                </div>

                <div className="grid w-full gap-8 laptop:grid-cols-2">
                    {groupedSkills.map(category => (
                        <section key={category.name} className="rounded-lg border border-gold-500/35 bg-black-300 p-6">
                            <h2 className="font-cinzel text-lg font-bold text-gold-primary">{category.name}</h2>
                            <p className="mt-2 font-lora text-4xs leading-relaxed text-gold-200">{category.description}</p>
                            <ul className="mt-6 grid gap-3 mobile:grid-cols-2">
                                {category.skills.map(skill => (
                                    <li key={skill.id}>
                                        <button
                                            type="button"
                                            aria-haspopup="dialog"
                                            onClick={() => openModal(skill.id)}
                                            className="flex h-full w-full items-center gap-3 rounded border border-black-100 bg-black-primary p-3 text-left transition hover:border-gold-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-primary"
                                        >
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_API_URL}/media/${skill.img}`}
                                                alt=""
                                                width={42}
                                                height={42}
                                                className="h-10 w-10 object-contain"
                                            />
                                            <span className="font-lato text-3xs text-white">{skill.name}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Skills;
