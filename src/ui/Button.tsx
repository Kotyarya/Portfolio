import React from 'react';

interface ButtonProps {
    onClick?: () => void;
    text: string;
    size: 'small' | 'large' | 'medium';
    children?: React.ReactNode;
}

const Button = ({size, onClick, text, children}: ButtonProps) => {

    const textStyle = size === 'small'
        ? 'text-[12px] leading-[36px]'
        : size === 'medium'
            ? 'text-[18px] leading-[46px]'
            : 'text-[20px] leading-[48px]';

    const buttonPadding = children ? "px-4" : size === 'large' ? 'px-17.5' : 'px-6';

    const isHoverable = children ? "" : "group";

    return (
        <div className={`bg-gold-gradient w-fit rounded-[4px] p-[1px] ${isHoverable}`}>
            <button
                className={`cursor-pointer ${buttonPadding} rounded-[3px]` +
                    'transition easy-in-out duration-500 flex items-center justify-center gap-3 ' +
                    'bg-black-primary ' +
                    'group-hover:bg-[rgba(0,0,0,0)] '}
                onClick={onClick}>
                {children}
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