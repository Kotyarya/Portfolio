export type QueryValue = string | string[] | number | undefined;

export const hasActiveSearchParams = <T extends object>(params: T) =>
    Object.values(params as Record<string, QueryValue>)
        .some(value => Array.isArray(value) ? value.length > 0 : Boolean(value));
