"use client";

import React, {Fragment, useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {Dialog, Transition} from "@headlessui/react";
import {usePathname} from "next/navigation";

import logo from "../assets/shared/logo.svg";
import Button from "@/ui/Button";
import {X} from "lucide-react";

const CV_URL =
    "https://drive.google.com/file/d/1bPN_AVJLIXBwkJOPsgCQqzJcUHecONYX/view?usp=share_link";

const Header = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    // закрывать меню при переходе по роутам
    useEffect(() => setOpen(false), [pathname]);

    return (
        <>
            <header
                className="w-full flex justify-center top-0 sticky z-100 animate-slide-in-top max-laptop:flex laptop:hidden">

                <div
                    className="w-full relative bg-black-primary backdrop-blur-[8px]">
                    <div className="flex items-center justify-between px-15 py-2 w-full relative z-50">
                        <Link href="/" className="shrink-0">
                            <Image src={logo} alt="logo" width={44} priority/>
                        </Link>

                        <button
                            type="button"
                            aria-label="Open menu"
                            onClick={() => setOpen(true)}
                            className="w-12 h-12 rounded-[14px] border border-gold-500/45 bg-black-primary/10 backdrop-blur-[8px] flex items-center justify-center"
                        >
                <span className="flex flex-col gap-[5px]">
                  <span className="block w-7 h-[2px] bg-gold-200"/>
                  <span className="block w-7 h-[2px] bg-gold-200"/>
                  <span className="block w-7 h-[2px] bg-gold-200"/>
                </span>
                        </button>
                    </div>
                </div>
            </header>
            <Transition show={open} as={Fragment}>
                <Dialog as="div" className="relative z-[999]" onClose={setOpen}>
                    {/* overlay */}
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px]"/>
                    </Transition.Child>

                    {/* right drawer */}
                    <Transition.Child
                        as={Fragment}
                        enter="transition-transform duration-300"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition-transform duration-200"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <Dialog.Panel className="fixed right-0 top-0 h-dvh w-[92%] max-w-[420px]">
                            {/* контейнер меню с теми же рамками */}
                            <div
                                className="h-full relative">
                                <div
                                    className="h-full relative bg-[rgba(0,0,0,0)] backdrop-blur-[8px] rounded-[26px] p-2">
                                    <div className="h-full flex flex-col px-6 py-5 relative z-50">
                                        {/* top row */}
                                        <div className="flex items-center justify-between">
                                            <Link href="/" className="shrink-0">
                                                <Image src={logo} alt="logo" width={46} priority/>
                                            </Link>

                                            <button
                                                type="button"
                                                aria-label="Close menu"
                                                onClick={() => setOpen(false)}
                                                className="w-fit h-fit p-1 rounded-[14px] border border-gold-500/45 bg-black-primary/10 backdrop-blur-[8px] flex items-center justify-center text-gold-200 text-[44px] leading-[44px]"
                                            ><X size={48}/>
                                            </button>
                                        </div>

                                        {/* links */}
                                        <nav className="mt-10">
                                            <ul className="text-base font-lato text-gold-200 flex flex-col gap-6">
                                                <li>
                                                    <Link href="/about-me">About Me</Link>
                                                </li>
                                                <li>
                                                    <Link href="/skills">Tech Stacks</Link>
                                                </li>
                                                <li>
                                                    <Link href="/projects">Projects</Link>
                                                </li>
                                                <li>
                                                    <Link href="/contact">Contact</Link>
                                                </li>
                                            </ul>

                                            <div className="mt-10">
                                                <Button
                                                    text={"Download CV"}
                                                    size={"medium"}
                                                    onClick={() =>
                                                        window.open(CV_URL, "_blank", "noopener,noreferrer")
                                                    }
                                                />
                                            </div>
                                        </nav>
                                        <div className="mt-auto pt-10 text-gold-200/50 font-lato text-5xs">
                                            © {new Date().getFullYear()} Max • Portfolio
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </Dialog>
            </Transition>
            <header
                className={"w-full flex justify-center sticky top-10 wide:top-20 z-100 animate-slide-in-top max-laptop:hidden"}>
                <div
                    className="w-auto h-auto p-5 bg-[url('../assets/header/boldBorderHeader.svg')] bg-no-repeat bg-contain bg-center relative">
                    <div className="relative bg-[rgba(0,0,0,0)] backdrop-blur-[8px] rounded-[26px] p-2">
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
                            <Button
                                text={"Download CV"}
                                size={"medium"}
                                onClick={() => window.open(CV_URL, "_blank", "noopener,noreferrer")}
                            />
                        </div>
                    </div>

                    <div
                        className="pointer-events-none top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 absolute w-[96.6%] h-[95%] bg-[url('../assets/header/thinBorderHeader.svg')] bg-no-repeat bg-contain bg-center"/>
                </div>
            </header>
        </>
    );
};

export default Header;