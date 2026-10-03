'use client';

import React from 'react';
import {useForm} from "react-hook-form";
import type {ISendContactDto} from "@/api/sendContactMessage";
import {contactAction} from "@/actions/contact";
import Image from "next/image";
import {useInView} from "@/hooks/useInView";
import {getAnimation} from "@/utils/getAnimation";
import Link from "next/link";
import {CONTACT_LIMITS, validateContactField} from '@/validation/contact';


const Contact = () => {
    const [submission, setSubmission] = React.useState<{ok: boolean; message: string} | null>(null);

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset
    } = useForm<ISendContactDto>();

    const onSubmit = async (data: ISendContactDto) => {
        setSubmission(null);
        const result = await contactAction(data);
        setSubmission(result);

        if (result.ok) {
            reset();
        }
    };

    const {ref, isVisible} = useInView<HTMLDivElement>()

    return (
        <div className="w-full" ref={ref}>
            <div className="flex p-14.5 justify-between mt-20 wide:px-65 max-laptop:flex-col max-laptop:items-center">
                <div
                    className={"flex flex-col w-153 max-mobile:w-[90vw] " + getAnimation(isVisible, "animate-slide-in-left")}>
                    <h1 className="text-gold-primary text-6xl max-ipad:text-4xl max-mobile:!text-xl font-cinzel font-bold mb-8 max-laptop:text-center">
                        Get in <span className="text-white">Touch</span> for Collaboration
                    </h1>
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
                        noValidate
                        aria-busy={isSubmitting}
                    >
                        <div className="flex flex-col gap-1">
                            <label className="text-white text-3xs font-lato ml-3" htmlFor="name">Name</label>
                            <input
                                id="name"
                                placeholder="John Smith"
                                autoComplete="name"
                                maxLength={CONTACT_LIMITS.name}
                                aria-invalid={errors.name ? "true" : "false"}
                                aria-describedby={errors.name ? "name-error" : undefined}
                                {...register("name", {validate: value => validateContactField('name', value)})}
                                className={"w-full bg-black-primary border border-black-100 px-3 py-2 rounded text-white text-3xs font-lato placeholder:text-black-100 " + (errors.name ? " border-red-900 placeholder:text-red-900" : "")}
                            />
                            {errors.name && <p id="name-error" role="alert" className="ml-3 text-4xs text-red-400">{errors.name.message}</p>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-white text-3xs font-lato ml-3" htmlFor="email">Email</label>
                            <input
                                id="email"
                                placeholder="johnsmith@gmail.com"
                                type="email"
                                autoComplete="email"
                                maxLength={CONTACT_LIMITS.email}
                                aria-invalid={errors.email ? "true" : "false"}
                                aria-describedby={errors.email ? "email-error" : undefined}
                                {...register("email", {validate: value => validateContactField('email', value)})}
                                className={"w-full bg-black-primary border border-black-100 px-3 py-2 rounded text-white text-3xs font-lato placeholder:text-black-100 " + (errors.email ? " border-red-900 placeholder:text-red-900" : "")}
                            />
                            {errors.email && <p id="email-error" role="alert" className="ml-3 text-4xs text-red-400">{errors.email.message}</p>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-white text-3xs font-lato ml-3" htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                placeholder="Type your message..."
                                maxLength={CONTACT_LIMITS.message}
                                aria-invalid={errors.message ? "true" : "false"}
                                aria-describedby={errors.message ? "message-error" : undefined}
                                {...register("message", {validate: value => validateContactField('message', value)})}
                                className={"resize-none w-full h-30 bg-black-primary border border-black-100 px-3 py-2 rounded text-white text-3xs font-lato placeholder:text-black-100 " + (errors.message ? " border-red-900 placeholder:text-red-900" : "")}
                                rows={4}
                            />
                            {errors.message && <p id="message-error" role="alert" className="ml-3 text-4xs text-red-400">{errors.message.message}</p>}
                        </div>

                        <p className="text-4xs leading-relaxed text-gold-200 font-lato">
                            I use your details only to reply to this message. Do not include sensitive information.{' '}
                            <Link href="/privacy" className="underline underline-offset-2">Privacy details</Link>
                        </p>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-3 w-full bg-gold-gradient text-black-primary font-taviraj text-base py-2 rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? "Sending..." : "Send message"}
                        </button>
                        {submission && (
                            <p
                                role={submission.ok ? "status" : "alert"}
                                className={`text-center font-lato text-4xs ${submission.ok ? "text-green-400" : "text-red-400"}`}
                            >
                                {submission.message}
                            </p>
                        )}
                    </form>
                </div>
            </div>
            <div
                className={"bg-gold-gradient flex items-center justify-center p-11 max-laptop:hidden " + getAnimation(isVisible, "animate-fade")}>
                <div
                    className="bg-black-primary flex flex-col items-center py-10 px-19 gap-2 rounded-3xl w-fit h-fit">
                    <h2 className="text-3xl text-gold-primary font-cinzel font-bold">My vCard</h2>
                    <Image src={process.env.NEXT_PUBLIC_API_URL + "/media/" + "vCard.svg"} alt="QR code with Maksym Aksamitnyi contact details" width={315}
                           height={315}/>
                </div>
            </div>
        </div>
    );
};

export default Contact;
