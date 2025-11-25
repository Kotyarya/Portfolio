"use server";

import {type ISendContactDto, sendContactMessage} from "@/api/sendContactMessage";

export async function contactAction(data: ISendContactDto) {
    return await sendContactMessage(data);
}