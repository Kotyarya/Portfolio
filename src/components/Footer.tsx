import React from 'react';
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/shared/logo.svg";
import gitHubIcon from "@/assets/shared/gitHub.svg"
import linkedInIcon from "@/assets/shared/linkedIn.svg"
import instagramIcon from "@/assets/shared/instagram.svg"


const Footer = () => {

    const year = new Date().getFullYear();

    return (
        <footer className='bg-black-400 grid grid-cols-3 w-full px-14.5 py-10'>
            <nav className='justify-self-start'>
                <ul className="text-xs font-lato text-gold-200 flex gap-6">
                    <li><Link href="/about-me">About Me</Link></li>
                    <li><Link href="/skills">Tech Stacks</Link></li>
                    <li><Link href="/projects">Projects</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>
            </nav>
            <div className="flex flex-col items-center gap-10 justify-self-center">
                <Link href="/" className="w-25 h-25">
                    <Image src={logo} alt="logo" priority/>
                </Link>
                <p className='text-gold-primary text-2xs font-cinzel text-center'>© {year} Max | Designed & Developed by
                    me.</p>
            </div>
            <div className="flex gap-11 justify-self-end">
                <a href="https://github.com/Kotyarya" target="_blank" rel="noopener noreferrer">
                    <Image src={gitHubIcon} alt={"GitHub Icon"}/>
                </a>
                <a href="https://www.linkedin.com/in/maksym-aksamitnyi-0b0967330/" target="_blank"
                   rel="noopener noreferrer">
                    <Image src={linkedInIcon} alt={"LinkedIn Icon"}/>
                </a>
                <a href="https://www.instagram.com/kotyarya_/" target="_blank" rel="noopener noreferrer">
                    <Image src={instagramIcon} alt={"Instagram Icon"}/>
                </a>
            </div>
        </footer>
    );
};

export default Footer;