import 'server-only';

export class ApiError extends Error {
    constructor(public readonly status: number, message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

const request = async <T>(path: string, init?: RequestInit): Promise<{data: T}> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiKey = process.env.SECRET_KEY;

    if (!apiUrl || !apiKey) {
        throw new ApiError(500, 'Server API configuration is missing');
    }

    const response = await fetch(new URL(path, `${apiUrl.replace(/\/$/, '')}/`), {
        ...init,
        signal: AbortSignal.timeout(8000),
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            ...init?.headers,
        },
    });

    if (!response.ok) {
        throw new ApiError(response.status, `Portfolio API request failed with ${response.status}`);
    }

    return {data: await response.json() as T};
};

export const baseAPI = {
    get: <T>(path: string) => request<T>(path),
    post: <T>(path: string, body: unknown) => request<T>(path, {
        method: 'POST',
        body: JSON.stringify(body),
    }),
};


export interface IApiResponse<T> {
    status: number;
    message: string;
    data: T;
}
