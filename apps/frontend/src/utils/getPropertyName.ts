// Función para devolver el nombre de una propiedad de un objeto como un string
export function getPropertyName<T extends object>(key: keyof T): string {
    return key as string;
}
