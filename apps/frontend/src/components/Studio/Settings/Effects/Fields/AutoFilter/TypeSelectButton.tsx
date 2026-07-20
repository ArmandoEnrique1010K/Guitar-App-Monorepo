import { AUTOFILTER_SCHEMA } from '@/constants/autoFilter.constants';
import { useEffects } from '@/hooks';
import { HorizontalButtonGroup } from '@/ui';
import { formatCamelCaseToWords, getPropertyName } from '@/utils';

export const TypeSelectButtons = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalButtonGroup
            label={formatCamelCaseToWords(
                getPropertyName<typeof AUTOFILTER_SCHEMA>('type'),
            )}
            title={AUTOFILTER_SCHEMA.type.label}
            value={effects.autoFilter.type}
            onChange={(value) =>
                updateEffect('autoFilter', {
                    type: value as 'sine' | 'square' | 'triangle' | 'sawtooth',
                })
            }
            options={['sine', 'square', 'triangle', 'sawtooth']}
        />
    );
};
