import React from 'react';

interface TitleProps {
    title: string;
    subtitle: string;
    position?: 'left' | 'center' | 'right';
}

const Title = ({title, subtitle, position = 'center'}: TitleProps) => {
    return (
        <div className='flex flex-col gap-2 w-fit'
             style={{alignItems: position === 'left' ? 'flex-start' : position === 'right' ? 'flex-end' : 'center'}}>
            <h3 className='text-gold-500 text-4xs font-taviraj font-light uppercase tracking-[2px]'>{subtitle}</h3>
            <h2 className='text-gold-primary text-4xl font-cinzel font-bold'>{title}</h2>
        </div>
    );
};

export default Title;