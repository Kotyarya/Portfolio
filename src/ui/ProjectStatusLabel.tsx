import React from 'react';
import ArchiveIcon from "@/assets/shared/archive.svg";
import TimeIcon from "@/assets/shared/time.svg";
import DoneIcon from "@/assets/shared/done.svg";
import Image from "next/image";


interface ProjectStatusLabelProps {
    status: string;
}

const ProjectStatusLabel = ({status}: ProjectStatusLabelProps) => {

    const statusIcon = status === 'Archived'
        ? ArchiveIcon
        : status === 'In Progress'
            ? TimeIcon
            : DoneIcon;

    return (
        <div className="bg-gold-gradient rounded-xs p-0.25">
            <div className="bg-black-primary flex items-center px-4 py-1">
                <Image src={statusIcon} alt="icon" className="w-4 h-4 mr-2"/>
                <p className="text-gold-primary font-lato text-4xs tracking-wider">{status}</p>
            </div>

        </div>
    );
};

export default ProjectStatusLabel;