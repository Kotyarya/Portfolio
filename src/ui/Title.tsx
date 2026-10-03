import React from 'react';

interface TitleProps {
    title: string;
    subtitle: string;
    position?: 'left' | 'center' | 'right';
    blackMode?: boolean;
    headingLevel?: 1 | 2;
}

const Title = ({title, subtitle, position = 'center', blackMode, headingLevel = 2}: TitleProps) => {
    const Heading = headingLevel === 1 ? 'h1' : 'h2';

    return (
        <div className='flex flex-col gap-2 w-fit'
             style={{alignItems: position === 'left' ? 'flex-start' : position === 'right' ? 'flex-end' : 'center'}}>
            <p className={`${blackMode ? "text-black-400" : "text-gold-500"} text-4xs font-taviraj font-light uppercase tracking-[2px]`}>{subtitle}</p>
            <Heading className={`${blackMode ? "text-black-400" : "text-gold-primary"} text-4xl max-mobile:text-xl font-cinzel font-bold`}>{title}</Heading>
        </div>
    );
};

export default Title;
