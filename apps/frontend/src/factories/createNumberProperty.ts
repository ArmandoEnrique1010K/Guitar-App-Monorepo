import type { NumberProperty } from '@/types';

// Crea un objeto con las propiedades para un campo de tipo rango
export const createNumberProperty = (
    // Valor minimo
    min: number,
    // Valor maximo
    max: number,
    // Salto entre valores
    step: number,
    // Valor por defecto
    defaultValue: number,
    // Factor de conversión (factor * valor)
    factor: number,
    // Unidad de medida (%, u., octavas, Hz., etc.)
    unit: string,
    // Cantidad máxima de cifras decimales
    decimals: number,
): NumberProperty => ({
    min,
    max,
    step,
    defaultValue,
    factor,
    unit,
    decimals,
});
