import type { OptionProperty } from '@/types';

// Crea un objeto con las propiedades para un campo de tipo selector
export const createOptionProperty = <T extends string>(
    // Nombre en español
    label: string,
    // Opción por defecto
    defaultOption: T,
    // Arreglo de opciones
    values: T[],
): OptionProperty<T> => ({
    label,
    defaultValue: defaultOption,
    values,
});
