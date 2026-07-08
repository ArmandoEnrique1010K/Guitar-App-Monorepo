// TODO: ESTO SE PODRIA MOVER A LA CARPETA UTILS PORQUE DEVUEVLE FUNCIONES Y NO OBJETOS
export const createEffectTransform = (factor: number, decimals: number) => ({
    format: (value: number) => Number((value * factor).toFixed(decimals)),

    // factor: 100, decimals: 0
    // 0.6 -> 60

    // factor: 100, decimals: 0
    // 60 -> 0.6

    // parse debe hacer el proceso inverso,
    // parse: (value: number) => value,

    // TODO: POR ALGUNA RAZON SE COLOCA +4
    parse: (displayValue: number) =>
        Number((displayValue / factor).toFixed(decimals + 4)),
});
