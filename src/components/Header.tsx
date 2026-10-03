"use client";

import React, {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {X} from "lucide-react";

import logo from "../assets/shared/logo.svg";
import Button from "@/ui/Button";

const CV_URL =
    "https://drive.google.com/file/d/1bPN_AVJLIXBwkJOPsgCQqzJcUHecONYX/view?usp=share_link";

const Header = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => setOpen(false), [pathname]);

    useEffect(() => {
        if (!open) return;

        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };

        window.addEventListener("keydown", closeOnEscape);
        return () => window.removeEventListener("keydown", closeOnEscape);
    }, [open]);

    return (
        <>
            <header className="sticky top-0 z-100 flex w-full justify-center laptop:top-10 wide:top-20">
                <div className="relative w-full bg-black-primary laptop:w-auto laptop:bg-[url('../assets/header/boldBorderHeader.svg')] laptop:bg-contain laptop:bg-center laptop:bg-no-repeat laptop:bg-transparent laptop:p-5">
                    <div className="relative laptop:rounded-[26px] laptop:bg-[rgba(0,0,0,0)] laptop:p-2 laptop:backdrop-blur-[8px]">
                        <div className="relative z-50 flex w-full items-center justify-between px-6 py-2 laptop:w-fit laptop:gap-11 laptop:px-15 laptop:py-3">
                            <Link href="/" className="shrink-0 laptop:mr-12">
                                <Image src={logo} alt="Maksym Aksamitnyi home" width={46} priority/>
                            </Link>

                            <button
                                type="button"
                                aria-label="Open menu"
                                aria-expanded={open}
                                aria-controls="site-navigation"
                                onClick={() => setOpen(true)}
                                className="flex h-12 w-12 items-center justify-center rounded-[14px] border border-gold-500/45 bg-black-primary/10 backdrop-blur-[8px] laptop:hidden"
                            >
                                <span className="flex flex-col gap-[5px]" aria-hidden="true">
                                    <span className="block h-[2px] w-7 bg-gold-200"/>
                                    <span className="block h-[2px] w-7 bg-gold-200"/>
                                    <span className="block h-[2px] w-7 bg-gold-200"/>
                                </span>
                            </button>

                            <nav
                                id="site-navigation"
                                aria-label="Main navigation"
                                className={`${open ? "max-laptop:flex" : "max-laptop:hidden"} max-laptop:fixed max-laptop:right-0 max-laptop:top-0 max-laptop:z-[999] max-laptop:h-dvh max-laptop:w-[92%] max-laptop:max-w-[420px] max-laptop:flex-col max-laptop:bg-black-primary/95 max-laptop:px-8 max-laptop:py-6 max-laptop:shadow-2xl max-laptop:backdrop-blur-[8px] laptop:flex laptop:items-center laptop:gap-11`}
                            >
                                <button
                                    type="button"
                                    aria-label="Close menu"
                                    onClick={() => setOpen(false)}
                                    className="ml-auto flex h-12 w-12 items-center justify-center rounded-[14px] border border-gold-500/45 text-gold-200 laptop:hidden"
                                >
                                    <X size={36}/>
                                </button>
                                <ul className="mt-10 flex flex-col gap-6 font-lato text-base text-gold-200 laptop:mt-0 laptop:flex-row laptop:gap-11">
                                    <li><Link href="/about-me">About Me</Link></li>
                                    <li><Link href="/skills">Tech Stacks</Link></li>
                                    <li><Link href="/projects">Projects</Link></li>
                                    <li><Link href="/contact">Contact</Link></li>
                                </ul>
                                <div className="mt-10 laptop:mt-0">
                                    <Button
                                        text="Download CV"
                                        size="medium"
                                        onClick={() => window.open(CV_URL, "_blank", "noopener,noreferrer")}
                                    />
                                </div>
                            </nav>
                        </div>
                    </div>

                    <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[95%] w-[96.6%] -translate-x-1/2 -translate-y-1/2 bg-[url('../assets/header/thinBorderHeader.svg')] bg-contain bg-center bg-no-repeat laptop:block"/>
                </div>
            </header>

            {open && (
                <button
                    type="button"
                    aria-label="Close menu"
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-90 bg-black/60 backdrop-blur-[2px] laptop:hidden"
                />
            )}
        </>
    );
};

export default Header;
