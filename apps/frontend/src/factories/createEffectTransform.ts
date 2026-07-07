// TODO: ESTO SE PODRIA MOVER A LA CARPETA UTILS PORQUE DEVUEVLE FUNCIONES Y NO OBJETOS
export const createEffectTransform = (factor: number, decimals: number) => ({
    format: (value: number) => Number((value * factor).toFixed(decimals)),
    parse: (value: number) => value * factor,
});
