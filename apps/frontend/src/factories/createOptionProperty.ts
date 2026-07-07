import type { OptionProperty } from '@/types';

export const createOptionProperty = <T extends string>(
    defaultOption: T,
    values: T[],
): OptionProperty<T> => ({
    defaultValue: defaultOption,
    values,
});
