import React from 'react';
import type {IProject} from "@/types/blocksDataTypes";
import {X} from "lucide-react";
import Image from "next/image";
import ProjectTagBlock from "@/ui/ProjectTagBlock";
import Button from "@/ui/Button";
import gitHubIcon from "@/assets/shared/gitHub.svg"
import internetIcon from "@/assets/shared/internet.svg"
import {Mousewheel, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

interface ProjectModalProps {
    activeProject?: IProject;
    closeModal: () => void;
}

const ProjectModal = ({activeProject, closeModal}: ProjectModalProps) => {

    const {text, img, name, preview} = activeProject || {};

    return (
        <>
            <div className="absolute w-full h-full bg-black opacity-80 z-999 top-0" onClick={closeModal}>
            </div>
            <div
                className="w-fit flex items-center justify-center bg-gold-gradient p-1 z-1000 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div
                    className="bg-black flex items-center justify-center p-7 pr-14 max-laptop:p-0 max-laptop:pb-10 w-max no-scrollbar gap-7 max-laptop:flex-col max-laptop:h-[90vh] max-ipad:w-120 max-mobile:!w-[90vw] max-laptop:overflow-y-scroll">
                    <div className="">
                        {
                            img?.length ?
                                <div className="
    w-full h-67 mobile:w-120 ipad:w-[577px] ipad:h-[508px] desk:w-[677px]

    [&_.swiper-pagination-bullet]:!w-[10px]
    [&_.swiper-pagination-bullet]:!h-[10px]
    [&_.swiper-pagination-bullet]:!rounded-full
    [&_.swiper-pagination-bullet]:!mx-[6px]
    [&_.swiper-pagination-bullet]:!bg-[#AD9255]
    [&_.swiper-pagination-bullet]:!opacity-45


    [&_.swiper-pagination-bullet-active]:!h-[25px]
    [&_.swiper-pagination-bullet-active]:!bg-gradient-to-b
    [&_.swiper-pagination-bullet-active]:!from-[#FFE998]
    [&_.swiper-pagination-bullet-active]:!to-[#57370D]
    [&_.swiper-pagination-bullet-active]:!opacity-100

    [&_.swiper-pagination]:!right-0
    [&_.swiper-pagination]:!z-100
  ">
                                    <Swiper
                                        modules={[Mousewheel, Pagination]}
                                        direction="vertical"
                                        slidesPerView={1}
                                        spaceBetween={30}
                                        mousewheel
                                        loop
                                        pagination={{clickable: true}}
                                        className="w-full h-full"
                                    >
                                        <SwiperSlide>
                                            <Image src={"http://localhost:4000/media/" + preview} alt={"ProjectImg"}
                                                   width={677}
                                                   height={508}
                                                   className="w-[677px] h-[508px] max-ipad:!h-67 max-ipad:!w-120 max-desk:w-[577px] object-cover"/>
                                        </SwiperSlide>
                                        {
                                            img?.map((img, i) => {
                                                return (
                                                    <SwiperSlide key={i}>
                                                        <Image src={"http://localhost:4000/media/" + img}
                                                               alt={"ProjectImg"} width={677}
                                                               height={508}
                                                               className="w-[677px] h-[508px] max-ipad:!h-67 max-desk:w-[577px] max-ipad:!w-120 object-cover"/>
                                                    </SwiperSlide>
                                                )
                                            })
                                        }
                                    </Swiper>
                                </div>
                                : <Image src={process.env.NEXT_PUBLIC_API_URL + "/media/" + preview} alt={"ProjectImg"}
                                         width={677}
                                         height={508}
                                         className="w-[677px] h-[508px] max-ipad:!h-67 max-desk:w-[577px] max-ipad:!w-120 object-cover"/>
                        }

                    </div>
                    <div className="flex flex-col w-109 max-mobile:w-full max-mobile:px-3 gap-6">
                        <h3 className="font-cinzel text-xl text-gold-primary font-bold">{name}</h3>
                        <p className="font-lora text-3xs text-white">{text}</p>
                        <p className="font-lora text-sm text-gold-700">Tech Stacks :</p>
                        <div className="flex flex-wrap gap-3 h-23.5 max-laptop:h-auto overflow-hidden">
                            {activeProject?.skills.map((skill, index) => (
                                <ProjectTagBlock name={skill.name} key={index} isLarge={true}/>
                            ))}
                        </div>
                        <div className="flex gap-4 max-laptop:mt-5 max-mobile:flex-wrap">
                            {
                                activeProject?.link && <Button text={"View Projects"} size={'large'}>
                                    <Image src={internetIcon} alt="Internet Logo" width={25} height={25}/>
                                </Button>
                            }
                            {
                                activeProject?.githubLink && <Button text={"View on GitHub"} size={'large'}>
                                    <Image src={gitHubIcon} alt="Github Logo" width={25} height={25}/>
                                </Button>
                            }
                        </div>
                    </div>
                    <button
                        className='w-fit h-fit flex items-center justify-center text-gold-primary cursor-pointer absolute z-1 top-4.5 right-4.5 p-1 rounded bg-black'
                        onClick={closeModal}>
                        <X size={30}/>
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProjectModal;