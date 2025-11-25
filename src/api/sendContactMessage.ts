import 'server-only';
import {baseAPI, type IApiResponse} from '@/api/http';

export interface ISendContactDto {
    name: string;
    email: string;
    message: string;
}

export async function sendContactMessage(dto: ISendContactDto) {
    const response = await baseAPI.post<IApiResponse<null>>('contact', dto);
    return response.data;
}