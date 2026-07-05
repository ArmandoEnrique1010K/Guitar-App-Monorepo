export const createEffectTransform = (factor: number, decimals: number) => ({
    format: (value: number) => Number((value * factor).toFixed(decimals)),
    parse: (value: number) => value * factor,
});
