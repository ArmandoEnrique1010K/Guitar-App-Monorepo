import type { NumberProperty } from "@/schemas";

export const createNumberProperty = (
    min: number,
    max: number,
    step: number,
    defaultValue: number,
    factor: number,
    unit: string,
    decimals: number
): NumberProperty => ({
    min,
    max,
    step,
    defaultValue,
    factor,
    unit,
    decimals
});