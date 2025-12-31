import React from 'react';

interface ProjectTagBlockProps {
    name: string;
    isLarge?: boolean;
}

const ProjectTagBlock = ({name, isLarge}: ProjectTagBlockProps) => {
    const largeStyle = isLarge ? " text-2xs px-4 py-1.5 " : " text-5xs px-3 py-1 "
    return (
        <div
            className={`cursor-default transition ease-out text-gold-primary font-lora rounded-[1px] border border-gold-primary w-fit h-fit ${largeStyle} hover:text-black-primary hover:bg-gold-primary`}>
            #{name}
        </div>
    );
};

export default ProjectTagBlock;