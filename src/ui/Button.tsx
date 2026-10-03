import React from 'react';
import Link from 'next/link';

interface ButtonProps {
    onClick?: () => void;
    text: string;
    size: 'small' | 'large' | 'medium';
    children?: React.ReactNode;
    href?: string;
    target?: '_blank';
}

const Button = ({size, onClick, text, children, href, target}: ButtonProps) => {

    const textStyle = size === 'small'
        ? 'text-[12px] leading-[36px]'
        : size === 'medium'
            ? 'text-[18px] leading-[46px]'
            : 'text-[20px] leading-[48px]';

    const buttonPadding = children ? "px-4" : size === 'large' ? 'px-17.5' : 'px-6';

    const isHoverable = children ? "" : "group";

    const className = `cursor-pointer ${buttonPadding} rounded-[3px]` +
        ' transition easy-in-out duration-500 flex items-center justify-center gap-3 ' +
        'bg-black-primary group-hover:bg-[rgba(0,0,0,0)] ';

    const content = (
        <>
            {children}
            <span
                className={'transition easy-in-out duration-500' +
                    ' font-taviraj font-medium ' +
                    textStyle +
                    ' text-gold-primary ' +
                    ' group-hover:text-black-primary'}>{text}
            </span>
        </>
    );

    return (
        <div className={`bg-gold-gradient w-fit rounded-[4px] p-[1px] ${isHoverable}`}>
            {href ? (
                <Link
                    href={href}
                    target={target}
                    rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                    className={className}
                >
                    {content}
                </Link>
            ) : (
                <button className={className} onClick={onClick}>
                    {content}
                </button>
            )}
        </div>
    );
};

export default Button;
