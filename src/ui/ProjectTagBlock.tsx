import React from 'react';

interface ProjectTagBlockProps {
    name: string;
}

const ProjectTagBlock = ({name}: ProjectTagBlockProps) => {
    return (
        <div
            className="cursor-default transition ease-out text-gold-primary font-lora text-5xs rounded-[1px] border border-gold-primary px-3 py-1 w-fit hover:text-black-primary hover:bg-gold-primary">
            #{name}
        </div>
    );
};

export default ProjectTagBlock;