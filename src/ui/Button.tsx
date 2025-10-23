import React from 'react';

interface ButtonProps {
    onClick?: () => void;
    text: string;
    size: 'small' | 'large';
}

const Button = ({size, onClick, text}: ButtonProps) => {


    return (
        <div className='bg-gold-gradient w-fit rounded-[4px] p-[1px] group delay-200'>
            <button
                className={'cursor-pointer px-17.5 rounded-[3px] bg-black-primary group-hover:bg-gold-gradient transition-all ease-in-out'}
                onClick={onClick}>
            <span
                className={'font-taviraj font-medium text-[20px] leading-[48px] group-hover:text-black-primary bg-gold-gradient bg-clip-text text-transparent transition-all ease-in-out'}>{text}</span>
            </button>
        </div>
    );
};

export default Button;