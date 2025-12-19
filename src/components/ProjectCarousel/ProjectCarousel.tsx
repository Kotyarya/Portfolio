"use client";
import React, {useRef} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectCoverflow, Keyboard, Navigation, Pagination} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import styles from "./project-carousel.module.css";
import type {IProject} from "@/types/blocksDataTypes";
import ProjectCard from "@/ui/ProjectCard";
import {uid} from "uid";
import Image from "next/image";
import {useRouter} from "next/navigation";

type Props = {
    items: IProject[] | string[];
    type: "projects" | "certificates";
};

export default function Carousel({
                                     items,
                                     type
                                 }: Props) {
    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);

    const spaceBetween = type === "projects" ? -26 : -286;
    const router = useRouter();

    const goToProject = (projectId: number) => {
        router.push(`/projects?projectId=${projectId}`);
    }

    return (
        <div className="flex flex-col items-center">
            <div className={`${styles.wrap} relative px-[72px] pt-[56px] pb-[88px] w-[1124px]`}
                 aria-roledescription="carousel">
                <button ref={prevRef} className={`${styles.arrow} ${styles.prev}`} aria-label="Previous slide">
                    <svg width="50" height="47" viewBox="0 0 50 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M24.0108 0.972411C22.725 2.26896 22.725 4.37108 24.0108 5.66762L41.4368 23.2401L24.0108 40.8126C22.725 42.1092 22.725 44.2113 24.0108 45.5078C25.2965 46.8044 27.3811 46.8044 28.6668 45.5078L48.4209 25.5877C49.7067 24.2912 49.7067 22.1891 48.4209 20.8925L28.6668 0.972411C27.3811 -0.324137 25.2965 -0.324137 24.0108 0.972411Z"/>
                        <path
                            d="M46.6416 23.2401C46.6416 21.4065 45.1676 19.9201 43.3493 19.9201H3.29234C1.47403 19.9201 -1.03116e-05 21.4065 -1.03116e-05 23.2401C-1.03116e-05 25.0737 1.47403 26.5601 3.29234 26.5601H43.3493C45.1676 26.5601 46.6416 25.0737 46.6416 23.2401Z"/>
                    </svg>
                </button>
                <button ref={nextRef} className={`${styles.arrow} ${styles.next}`} aria-label="Next slide">
                    <svg width="50" height="47" viewBox="0 0 50 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M24.0108 0.972411C22.725 2.26896 22.725 4.37108 24.0108 5.66762L41.4368 23.2401L24.0108 40.8126C22.725 42.1092 22.725 44.2113 24.0108 45.5078C25.2965 46.8044 27.3811 46.8044 28.6668 45.5078L48.4209 25.5877C49.7067 24.2912 49.7067 22.1891 48.4209 20.8925L28.6668 0.972411C27.3811 -0.324137 25.2965 -0.324137 24.0108 0.972411Z"/>
                        <path
                            d="M46.6416 23.2401C46.6416 21.4065 45.1676 19.9201 43.3493 19.9201H3.29234C1.47403 19.9201 -1.03116e-05 21.4065 -1.03116e-05 23.2401C-1.03116e-05 25.0737 1.47403 26.5601 3.29234 26.5601H43.3493C45.1676 26.5601 46.6416 25.0737 46.6416 23.2401Z"/>
                    </svg>
                </button>
                <Swiper
                    modules={[Navigation, Pagination, Keyboard, Autoplay, EffectCoverflow]}
                    effect="coverflow"
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 180,
                        modifier: 1.5,
                        slideShadows: true,
                    }}
                    centeredSlides
                    slidesPerView={3}
                    spaceBetween={spaceBetween}
                    initialSlide={1}
                    loop={true}
                    loopAdditionalSlides={0}
                    watchOverflow={false}
                    speed={450}
                    keyboard={{enabled: true}}
                    autoplay={false}
                    pagination={{el: `.${styles.dots}`, clickable: false}}
                    onSwiper={(swiper) => {
                        // @ts-ignore
                        swiper.params.navigation.prevEl = prevRef.current!;
                        // @ts-ignore
                        swiper.params.navigation.nextEl = nextRef.current!;
                        swiper.navigation.init();
                        swiper.navigation.update();
                    }}
                >
                    {
                        type === "projects"
                            ? (items as IProject[]).map((p) => (
                                <SwiperSlide key={p.id + uid(10)} className={styles.slide}>
                                    <ProjectCard project={p} onClick={() => goToProject(p.id)}/>
                                </SwiperSlide>
                            ))
                            : (items as string[]).map((p, index) => (
                                <SwiperSlide className={styles.slide} key={index}>
                                    <Image src={"http://localhost:4000/media/" + p} alt={"Certificate"} width={600}
                                           height={464}/>
                                </SwiperSlide>
                            ))
                    }
                </Swiper>
            </div>
            <div className={styles.dots}/>
        </div>
    );
}