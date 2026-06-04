// FUNCIÓN AUXILIAR PARA FORMATEAR EL VALOR DE UN PARAMETRO DE UN EFECTO DE SONIDO EN LA VISTA DEL USUARIO
export const formatEffectValue = (
    value: number,
    factor: number,
    decimals: number,
) => {
    return +(value * factor).toFixed(decimals);
};
