'use client';

import React from 'react';
import {useForm} from "react-hook-form";
import type {ISendContactDto} from "@/api/sendContactMessage";
import {contactAction} from "@/actions/contact";
import Image from "next/image";
import {useInView} from "@/hooks/useInView";
import {getAnimation} from "@/utils/getAnimation";


const Contact = () => {

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset
    } = useForm<ISendContactDto>();

    const onSubmit = async (data: ISendContactDto) => {
        try {
            const res = await contactAction(data);
            console.log(res);
            alert("Сообщение отправлено!");
            reset();
        } catch (e) {
            console.error(e);
            alert("Ошибка при отправке");
        }
    };

    const {ref, isVisible} = useInView<HTMLDivElement>()

    return (
        <div className="w-full" ref={ref}>
            <div className="flex p-14.5 justify-between mt-20 wide:px-65 max-laptop:flex-col max-laptop:items-center">
                <div
                    className={"flex flex-col w-153 max-mobile:w-[90vw] " + getAnimation(isVisible, "animate-slide-in-left")}>
                    <h2 className="text-gold-primary text-6xl max-ipad:text-4xl max-mobile:!text-xl font-cinzel font-bold mb-8 max-laptop:text-center">
                        Get in <span className="text-white">Touch</span> for Collaboration
                    </h2>
                    <p className="text-white text-sm font-lora mb-16 max-laptop:hidden">
                        I’m open to freelance opportunities, long-term collaboration, or project-based work. Feel free
                        to send a message — I’ll get back to you as soon as possible.
                    </p>
                    <div className="">

                    </div>
                </div>
                <div
                    className={"w-107 bg-black-200 px-8 py-13 rounded-[11px] max-mobile:w-[90vw] " + getAnimation(isVisible, "animate-slide-in-right")}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-6"
                    >
                        <div className="flex flex-col gap-1">
                            <label className="text-white text-3xs font-lato ml-3" htmlFor="name">Name</label>
                            <input
                                id="name"
                                placeholder="Jonh Smith"
                                {...register("name", {required: "Please enter your name"})}
                                className={"w-full bg-black-primary border border-black-100 px-3 py-2 rounded text-white text-3xs font-lato placeholder:text-black-100 " + (errors.name ? " border-red-900 placeholder:text-red-900" : "")}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-white text-3xs font-lato ml-3" htmlFor="email">Email</label>
                            <input
                                id="email"
                                placeholder="johnsmith@gmail.com"
                                type="email"
                                {...register("email", {
                                    required: "Введите email",
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "Некорректный email",
                                    },
                                })}
                                className={"w-full bg-black-primary border border-black-100 px-3 py-2 rounded text-white text-3xs font-lato placeholder:text-black-100 " + (errors.name ? " border-red-900 placeholder:text-red-900" : "")}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-white text-3xs font-lato ml-3" htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                placeholder="Type your message..."
                                {...register("message", {required: "Введите сообщение"})}
                                className={"resize-none w-full h-30 bg-black-primary border border-black-100 px-3 py-2 rounded text-white text-3xs font-lato placeholder:text-black-100 " + (errors.name ? " border-red-900 placeholder:text-red-900" : "")}
                                rows={4}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-3 w-full bg-gold-gradient text-black-primary font-taviraj text-base py-2 rounded cursor-pointer"
                        >
                            {isSubmitting ? "Sending..." : "Send message"}
                        </button>
                    </form>
                </div>
            </div>
            <div
                className={"bg-gold-gradient flex items-center justify-center p-11 max-laptop:hidden " + getAnimation(isVisible, "animate-fade")}>
                <div
                    className="bg-black-primary flex flex-col items-center py-10 px-19 gap-2 rounded-3xl w-fit h-fit">
                    <h2 className="text-3xl text-gold-primary font-cinzel font-bold">My vCard</h2>
                    <Image src={process.env.NEXT_PUBLIC_API_URL + "/media/" + "vCard.svg"} alt={"vCard"} width={315}
                           height={315}/>
                </div>
            </div>
        </div>
    );
};

export default Contact;