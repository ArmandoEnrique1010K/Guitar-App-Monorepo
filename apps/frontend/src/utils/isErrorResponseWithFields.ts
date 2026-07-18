import type { ErrorResponseWithFields } from '@/types';

// Si se tiene una respuesta que tiene un objeto de errores por cada uno de los campos
export const isErrorResponseWithFields = (
    value: unknown | ErrorResponseWithFields,
): value is ErrorResponseWithFields => {
    return typeof value === 'object' && value !== null && 'errors' in value;
};
