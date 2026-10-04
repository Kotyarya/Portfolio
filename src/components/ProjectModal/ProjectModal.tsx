import React from 'react';
import type {IProject} from "@/types/blocksDataTypes";
import {X} from "lucide-react";
import Image from "next/image";
import ProjectTagBlock from "@/ui/ProjectTagBlock";
import Button from "@/ui/Button";
import gitHubIcon from "@/assets/shared/gitHub.svg";
import internetIcon from "@/assets/shared/internet.svg";
import {Mousewheel, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

interface ProjectModalProps {
    activeProject?: IProject;
    closeModal: () => void;
}

const ProjectModal = ({activeProject, closeModal}: ProjectModalProps) => {
    React.useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') closeModal();
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [closeModal]);

    if (!activeProject) return null;

    const {text, img, name, preview, caseStudy, githubLinks, githubLink, link, availabilityNote} = activeProject;
    const sourceLinks = githubLinks ?? (
        githubLink?.startsWith('http') ? [{label: 'Source', url: githubLink}] : []
    );

    const projectImage = (image: string, alt: string) => (
        <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/media/${image}`}
            alt={alt}
            width={677}
            height={508}
            className="h-full w-full object-cover"
        />
    );

    return (
        <>
            <div
                className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm"
                aria-hidden="true"
                onClick={closeModal}
            />
            <div className="pointer-events-none fixed inset-0 z-[1000] flex items-center justify-center p-3 mobile:p-6">
                <section
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="project-modal-title"
                    className="pointer-events-auto relative max-h-[calc(100dvh-1.5rem)] w-full max-w-[1500px] overflow-hidden bg-gold-gradient p-1 shadow-gold-regular mobile:max-h-[calc(100dvh-3rem)]"
                >
                    <div className="no-scrollbar relative max-h-[calc(100dvh-2rem)] overflow-y-auto bg-black-400 mobile:max-h-[calc(100dvh-3.5rem)] laptop:grid laptop:h-[min(820px,calc(100dvh-3.5rem))] laptop:grid-cols-[minmax(0,1.2fr)_minmax(380px,0.8fr)] laptop:overflow-hidden">
                        <div className="flex min-h-0 items-center justify-center bg-black-primary laptop:p-7">
                            <div className="aspect-[4/3] max-h-[44dvh] w-full overflow-hidden laptop:max-h-none">
                                {img?.length ? (
                                    <Swiper
                                        modules={[Mousewheel, Pagination]}
                                        direction="vertical"
                                        slidesPerView={1}
                                        spaceBetween={30}
                                        mousewheel
                                        loop
                                        pagination={{clickable: true}}
                                        className="h-full w-full
                                            [&_.swiper-pagination]:!right-3
                                            [&_.swiper-pagination]:!z-10
                                            [&_.swiper-pagination-bullet]:!mx-[6px]
                                            [&_.swiper-pagination-bullet]:!h-[10px]
                                            [&_.swiper-pagination-bullet]:!w-[10px]
                                            [&_.swiper-pagination-bullet]:!rounded-full
                                            [&_.swiper-pagination-bullet]:!bg-[#AD9255]
                                            [&_.swiper-pagination-bullet]:!opacity-45
                                            [&_.swiper-pagination-bullet-active]:!h-[25px]
                                            [&_.swiper-pagination-bullet-active]:!bg-gradient-to-b
                                            [&_.swiper-pagination-bullet-active]:!from-[#FFE998]
                                            [&_.swiper-pagination-bullet-active]:!to-[#57370D]
                                            [&_.swiper-pagination-bullet-active]:!opacity-100"
                                    >
                                        <SwiperSlide>
                                            {projectImage(preview, `${name} project preview`)}
                                        </SwiperSlide>
                                        {img.map((image, index) => (
                                            <SwiperSlide key={image}>
                                                {projectImage(image, `${name} project screenshot ${index + 1}`)}
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                ) : projectImage(preview, `${name} project preview`)}
                            </div>
                        </div>

                        <div className="no-scrollbar min-h-0 px-4 pb-8 pt-14 mobile:px-7 laptop:overflow-y-auto laptop:px-8 laptop:pb-10 laptop:pt-0 desk:px-10">
                            <div className="sticky top-0 z-10 -mx-4 mb-5 bg-black-400/95 px-4 pb-3 pt-4 backdrop-blur mobile:-mx-7 mobile:px-7 laptop:-mx-8 laptop:px-8 laptop:pt-7 desk:-mx-10 desk:px-10">
                                <h2 id="project-modal-title" className="pr-10 font-cinzel text-lg font-bold text-gold-primary mobile:text-xl">
                                    {name}
                                </h2>
                            </div>

                            <div className="flex flex-col gap-6">
                                <p className="font-lora text-3xs leading-relaxed text-white">{text}</p>

                                {caseStudy && (
                                    <dl className="grid gap-4 font-lora text-4xs leading-relaxed text-white">
                                        <div>
                                            <dt className="mb-1 text-gold-500">Role</dt>
                                            <dd>{caseStudy.role}</dd>
                                        </div>
                                        <div>
                                            <dt className="mb-1 text-gold-500">Challenge</dt>
                                            <dd>{caseStudy.challenge}</dd>
                                        </div>
                                        <div>
                                            <dt className="mb-1 text-gold-500">Architecture</dt>
                                            <dd>{caseStudy.architecture}</dd>
                                        </div>
                                        <div>
                                            <dt className="mb-1 text-gold-500">Key decisions</dt>
                                            <dd>
                                                <ul className="list-disc space-y-1 pl-5">
                                                    {caseStudy.decisions.map(decision => <li key={decision}>{decision}</li>)}
                                                </ul>
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="mb-1 text-gold-500">Result</dt>
                                            <dd>{caseStudy.result}</dd>
                                        </div>
                                    </dl>
                                )}

                                <div>
                                    <h3 className="font-lora text-sm text-gold-700">Tech Stacks:</h3>
                                    <div className="mt-4 flex flex-wrap gap-3">
                                        {activeProject?.skills.map((skill, index) => (
                                            <ProjectTagBlock name={skill.name} key={`${skill.name}-${index}`} isLarge={true}/>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    {link?.startsWith('http') && (
                                        <Button text="View Live" size="large" href={link} target="_blank">
                                            <Image src={internetIcon} alt="" aria-hidden="true" width={25} height={25}/>
                                        </Button>
                                    )}
                                    {sourceLinks.map(source => (
                                        <Button
                                            key={source.url}
                                            text={`${source.label} GitHub`}
                                            size="large"
                                            href={source.url}
                                            target="_blank"
                                        >
                                            <Image src={gitHubIcon} alt="" aria-hidden="true" width={25} height={25}/>
                                        </Button>
                                    ))}
                                </div>

                                {availabilityNote && (
                                    <p className="font-lora text-4xs leading-relaxed text-gold-200">{availabilityNote}</p>
                                )}
                            </div>
                        </div>

                        <button
                            type="button"
                            aria-label="Close project details"
                            className="absolute right-3 top-3 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded border border-gold-500/50 bg-black-400/95 text-gold-primary transition hover:border-gold-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-primary mobile:right-4 mobile:top-4"
                            onClick={closeModal}
                        >
                            <X size={26}/>
                        </button>
                    </div>
                </section>
            </div>
        </>
    );
};

export default ProjectModal;
