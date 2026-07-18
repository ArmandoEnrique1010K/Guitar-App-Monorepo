import type { ErrorResponse } from '@/types';

// Si se tiene una respuesta que tiene un objeto con un error unico
export const isErrorResponse = (
    value: unknown | ErrorResponse,
): value is ErrorResponse => {
    return typeof value === 'object' && value !== null && 'error' in value;
};
