import React from 'react';

interface ButtonProps {
    onClick?: () => void;
    text: string;
    size: 'small' | 'large';
}

const Button = ({size, onClick, text}: ButtonProps) => {

    const textStyle = size === 'small'
        ? 'text-[12px] leading-[36px]'
        : 'text-[20px] leading-[48px]';

    const buttonPadding = size === 'small' ? 'px-6' : 'px-17.5';

    return (
        <div className='bg-gold-gradient w-fit rounded-[4px] p-[1px] group'>
            <button
                className={`cursor-pointer ${buttonPadding} rounded-[3px]` +
                    'transition easy-in-out duration-500 ' +
                    'bg-black-primary ' +
                    'group-hover:bg-[rgba(0,0,0,0)] '}
                onClick={onClick}>
                <span
                    className={'transition easy-in-out duration-500' +
                        ' font-taviraj font-medium ' +
                        textStyle +
                        ' text-gold-primary ' +
                        ' group-hover:text-black-primary'}>{text}
                </span>
            </button>
        </div>
    );
};

export default Button;