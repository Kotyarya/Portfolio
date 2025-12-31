import React from 'react';

interface TitleProps {
    title: string;
    subtitle: string;
    position?: 'left' | 'center' | 'right';
    blackMode?: boolean;
}

const Title = ({title, subtitle, position = 'center', blackMode}: TitleProps) => {
    return (
        <div className='flex flex-col gap-2 w-fit'
             style={{alignItems: position === 'left' ? 'flex-start' : position === 'right' ? 'flex-end' : 'center'}}>
            <h4 className={`${blackMode ? "text-black-400" : "text-gold-500"} text-4xs font-taviraj font-light uppercase tracking-[2px]`}>{subtitle}</h4>
            <h2 className={`${blackMode ? "text-black-400" : "text-gold-primary"} text-4xl max-mobile:text-xl font-cinzel font-bold`}>{title}</h2>
        </div>
    );
};

export default Title;