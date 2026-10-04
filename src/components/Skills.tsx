"use client";

import React from 'react';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import type {IBlock, ISkill} from '@/types/blocksDataTypes';
import Title from '@/ui/Title';
import SkillBlock from '@/ui/SkillBlock';
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
        matches: ['react', 'next', 'typescript', 'javascript', 'html', 'css', 'tailwind', 'sass', 'seo', 'ux', 'ui'],
    },
    {
        name: 'Backend & Data',
        description: 'APIs, application logic, persistence and data access.',
        matches: ['nest', 'node', 'postgres', 'mongo', 'prisma', 'rest', 'sql', 'postman'],
    },
    {
        name: 'Software & Game Development',
        description: 'Object-oriented desktop software and interactive game systems.',
        matches: ['swift', 'swiftui', 'ios', 'java', 'c#', 'windows forms', 'unreal', 'algorithm'],
    },
    {
        name: 'Delivery & Collaboration',
        description: 'Source control, automation, design handoff and project delivery tools.',
        matches: ['git', 'github', 'ci/cd', 'figma', 'jira', 'trello', 'notion', 'scrum'],
    },
] as const;

const FLOAT_OFFSETS = [
    'pt-0',
    'pt-0 mobile:pt-10',
    'pt-0 ipad:pt-3',
    'pt-0 mobile:pt-5 laptop:pt-14',
    'pt-0 ipad:pt-8',
] as const;

const categoryFor = (skill: ISkill) => {
    const normalizedName = skill.name.toLowerCase();
    return categories.find(category => category.matches.some(match => normalizedName.includes(match)))?.name
        ?? 'Additional Skills';
};

const categoryId = (name: string) => `skills-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

const Skills = ({skillsPreview, skills, activeSkill, skillId}: SkillsProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const {isVisible, ref} = useInView<HTMLDivElement>();
    const [isBlurred, setIsBlurred] = React.useState(false);

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
        setIsBlurred(false);
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

            <div
                aria-hidden="true"
                className={`pointer-events-none fixed inset-0 z-40 bg-black/15 backdrop-blur-[6px] transition-opacity duration-300 ${isBlurred ? 'opacity-100' : 'opacity-0'}`}
            />

            <section className="relative mx-auto mt-20 flex w-[92vw] max-w-[1350px] flex-col items-center" ref={ref}>
                <div className={`flex max-w-4xl flex-col items-center gap-5 text-center ${getAnimation(isVisible, 'animate-slide-in-bottom')}`}>
                    <Title title={skillsPreview.title} subtitle={skillsPreview.subtitle} headingLevel={1}/>
                    <p className="font-lora text-2xs leading-relaxed text-white laptop:text-sm">{skillsPreview.text}</p>
                </div>

                <div className="mt-20 flex w-full flex-col gap-24 max-mobile:gap-16">
                    {groupedSkills.map((category, categoryIndex) => {
                        const headingId = categoryId(category.name);

                        return (
                            <section key={category.name} aria-labelledby={headingId} className="relative w-full">
                                <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
                                    <p className="font-taviraj text-5xs uppercase tracking-[3px] text-gold-500">
                                        0{categoryIndex + 1}
                                    </p>
                                    <h2 id={headingId} className="mt-2 font-cinzel text-xl font-bold text-gold-primary mobile:text-2xl">
                                        {category.name}
                                    </h2>
                                    <p className="mt-3 max-w-2xl font-lora text-4xs leading-relaxed text-gold-200 mobile:text-3xs">
                                        {category.description}
                                    </p>
                                </div>

                                <ul className="mt-8 grid w-full grid-cols-1 gap-x-8 gap-y-3 mobile:grid-cols-2 ipad:grid-cols-3 laptop:grid-cols-4 desk:grid-cols-5">
                                    {category.skills.map((skill, index) => (
                                        <li
                                            key={skill.id}
                                            className={`flex min-h-[270px] items-start justify-center ${FLOAT_OFFSETS[index % FLOAT_OFFSETS.length]}`}
                                        >
                                            <button
                                                type="button"
                                                aria-haspopup="dialog"
                                                aria-label={`Open ${skill.name} details`}
                                                onClick={() => openModal(skill.id)}
                                                onMouseEnter={() => setIsBlurred(true)}
                                                onMouseLeave={() => setIsBlurred(false)}
                                                onFocus={() => setIsBlurred(true)}
                                                onBlur={() => setIsBlurred(false)}
                                                className="group relative z-50 flex animate-float flex-col items-center transition duration-300 hover:animate-none hover:shadow-gold-small focus-visible:animate-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-primary"
                                                style={{animationDelay: `${(index + categoryIndex) * 0.15}s`}}
                                            >
                                                <SkillBlock skill={skill}/>
                                                <span className="mt-3 max-w-[204px] font-cinzel text-4xs text-gold-200 transition-colors group-hover:text-gold-primary group-focus-visible:text-gold-primary">
                                                    {skill.name}
                                                </span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        );
                    })}
                </div>
            </section>
        </>
    );
};

export default Skills;
