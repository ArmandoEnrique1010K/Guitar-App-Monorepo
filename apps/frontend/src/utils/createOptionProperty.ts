import type { OptionProperty } from "@/schemas";

export const createOptionProperty = <
    T extends string
>(
    defaultValue: T,
    values: T[]
): OptionProperty<T> => ({
    default: defaultValue,
    values
});