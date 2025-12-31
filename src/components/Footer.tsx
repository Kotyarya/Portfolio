"use client";
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/shared/logo.svg";
import gitHubIcon from "@/assets/shared/gitHub.svg"
import linkedInIcon from "@/assets/shared/linkedIn.svg"
import instagramIcon from "@/assets/shared/instagram.svg"
import {useInView} from "@/hooks/useInView";
import {getAnimation} from "@/utils/getAnimation";


const Footer = () => {

    const year = new Date().getFullYear();
    const {ref, isVisible} = useInView<HTMLElement>()

    return (
        <footer
            className='bg-black-400 grid grid-cols-3 max-laptop:flex max-mobile:flex-col-reverse max-mobile:gap-15 max-mobile:items-center max-laptop:justify-between w-full px-14.5 max-mobile:px-3 wide:px-65 py-10'
            ref={ref}>
            <nav className={'max-laptop:hidden justify-self-start ' + getAnimation(isVisible, 'animate-slide-in-left')}>
                <ul className="text-xs max-desk:text-3xs font-lato text-gold-200 flex gap-6">
                    <li><Link href="/about-me">About Me</Link></li>
                    <li><Link href="/skills">Tech Stacks</Link></li>
                    <li><Link href="/projects">Projects</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>
            </nav>
            <div
                className={"flex flex-col items-center gap-10 max-laptop:items-start max-mobile:!items-center " + getAnimation(isVisible, 'animate-slide-in-top')}>
                <Link href="/" className="w-25 h-25">
                    <Image src={logo} alt="logo" priority/>
                </Link>
                <p className='text-gold-primary text-2xs max-mobile:!text-4xs max-desk:text-3xs font-cinzel text-center max-laptop:w-[300px] max-laptop:text-start max-mobile:!text-center'>
                    © {year} Maksym Aksamitnyi <br/>
                    Designed & Developed by
                    me.</p>
            </div>
            <div
                className={"flex gap-11 max-ipad:gap-7 justify-self-end " + getAnimation(isVisible, 'animate-slide-in-right')}>
                <a href="https://github.com/Kotyarya" target="_blank" rel="noopener noreferrer">
                    <Image src={gitHubIcon} alt={"GitHub Icon"} className="w-9 h-9"/>
                </a>
                <a href="https://www.linkedin.com/in/maksym-aksamitnyi-0b0967330/" target="_blank"
                   rel="noopener noreferrer">
                    <Image src={linkedInIcon} alt={"LinkedIn Icon"} className="w-9 h-9"/>
                </a>
                <a href="https://www.instagram.com/kotyarya_/" target="_blank" rel="noopener noreferrer">
                    <Image src={instagramIcon} alt={"Instagram Icon"} className="w-9 h-9"/>
                </a>
            </div>
        </footer>
    );
};

export default Footer;