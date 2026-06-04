import type { OptionProperty } from '@/schemas';

export const createOptionProperty = <T extends string>(
    defaultOption: T,
    values: T[],
): OptionProperty<T> => ({
    defaultValue: defaultOption,
    values,
});
