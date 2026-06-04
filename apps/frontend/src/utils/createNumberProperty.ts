import type { NumberProperty } from '@/schemas';

export const createNumberProperty = (
    min: number, // Valor minimo
    max: number, // Valor maximo
    step: number, // Salto entre valores
    defaultValue: number, // Valor por defecto
    factor: number, // Factor de conversión (factor * valor)
    unit: string, // Unidad (%, u., octavas, etc.)
    decimals: number, // Cantidad de cifras decimales
): NumberProperty => ({
    min,
    max,
    step,
    defaultValue,
    factor,
    unit,
    decimals,
});
