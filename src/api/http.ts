import axios from 'axios';

export const baseAPI = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 8000,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.SECRET_KEY!,
    },
});


export interface IApiResponse<T> {
    status: number;
    message: string;
    data: T;
}