"use server";

import {type ISendContactDto, sendContactMessage} from "@/api/sendContactMessage";
import axios from "axios";

export async function contactAction(data: ISendContactDto) {
    try {
        await sendContactMessage(data);
        return {ok: true as const, message: "Message sent successfully."};
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 429) {
            return {
                ok: false as const,
                message: "Too many messages. Please try again in 15 minutes.",
            };
        }

        console.error("Contact form submission failed", error);
        return {
            ok: false as const,
            message: "The message could not be sent. Please try again later.",
        };
    }
}
