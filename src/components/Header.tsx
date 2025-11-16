import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../assets/shared/logo.svg';

const Header = () => {
    return (
        <header className="w-full flex justify-center sticky top-10 z-999 animate-slide-in-top">
            <div
                className="w-auto h-auto p-4 bg-[url('../assets/header/boldBorderHeader.svg')] bg-no-repeat bg-contain bg-center relative"
            >
                <div className="relative backdrop-blur-[8px] rounded-[26px]">
                    <div className="flex items-center gap-11 px-15 py-3 w-fit relative z-50 ">
                        <Link href="/" className="mr-12 shrink-0">
                            <Image src={logo} alt="logo" width={46} priority/>
                        </Link>
                        <nav>
                            <ul className="text-base font-lato text-gold-200 flex gap-11">
                                <li><Link href="/about-me">About Me</Link></li>
                                <li><Link href="/skills">Tech Stacks</Link></li>
                                <li><Link href="/projects">Projects</Link></li>
                                <li><Link href="/contact">Contact</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div
                    className="pointer-events-none top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 absolute w-[96.6%] h-[95%] bg-[url('../assets/header/thinBorderHeader.svg')] bg-no-repeat bg-contain bg-center">
                </div>

            </div>
        </header>
    );
};

export default Header;