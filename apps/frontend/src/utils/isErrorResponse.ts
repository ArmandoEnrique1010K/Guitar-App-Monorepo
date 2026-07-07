import type { ErrorResponseWithFields } from '@/types';

export const isErrorResponse = (
    value: unknown | ErrorResponseWithFields,
): value is ErrorResponseWithFields => {
    return (
        typeof value === 'object' &&
        value !== null &&
        ('error' in value || 'errors' in value)
    );
};
