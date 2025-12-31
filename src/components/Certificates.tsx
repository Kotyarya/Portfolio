"use client";
import React from 'react';
import type {IBlockCertificates} from "@/types/blocksDataTypes";
import Title from "@/ui/Title";
import Carousel from "@/components/ProjectCarousel/ProjectCarousel";
import {useInView} from "@/hooks/useInView";
import {getAnimation} from "@/utils/getAnimation";

interface CertificatesProps {
    certificates: IBlockCertificates
}

const Certificates = ({certificates}: CertificatesProps) => {

    const {ref, isVisible} = useInView<HTMLDivElement>()

    return (
        <div className="flex flex-col items-center justify-center w-full max-mobile:hidden" ref={ref}>
            <div
                className={"flex flex-col items-center justify-center " + getAnimation(isVisible, "animate-slide-in-bottom")}>
                <Title title={certificates.title} subtitle={certificates.subtitle}/>
                <p className="w-[90vw] text-2xs mobile:w-[530px] ipad:w-[693px] laptop:w-[840px] laptop:text-sm text-white font-lora text-center mb-14">{certificates.text}</p>
            </div>
            <div className={getAnimation(isVisible, "animate-fade")}>
                <Carousel items={certificates.certificatesImgList} type={"certificates"}/>
            </div>
        </div>
    );
};

export default Certificates;