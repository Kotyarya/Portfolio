import React from 'react';
import type {IBlockCertificates} from "@/types/blocksDataTypes";
import Title from "@/ui/Title";
import Carousel from "@/components/ProjectCarousel/ProjectCarousel";

interface CertificatesProps {
    certificates: IBlockCertificates
}

const Certificates = ({certificates}: CertificatesProps) => {

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <Title title={certificates.title} subtitle={certificates.subtitle}/>
            <p className="w-[840px] text-white text-sm font-lora text-center mb-14">{certificates.text}</p>
            <Carousel items={certificates.certificatesImgList} type={"certificates"}/>
        </div>
    );
};

export default Certificates;