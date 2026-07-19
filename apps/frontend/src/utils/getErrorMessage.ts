import type { Error } from '@/types';

// Obtiene el mensaje de error desde un arreglo de Error para un campo especifico
export const getErrorMessage = (errors: Error[], path: string) =>
    errors.find((e) => e.path === path)?.msg ?? '';
