import { VIBRATO_SCHEMA } from '@/constants/vibrato.constants';
import { useEffects } from '@/hooks';
import { HorizontalButtonGroup } from '@/ui';
import { formatCamelCaseToWords, getPropertyName } from '@/utils';

export const TypeSelectButtons = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalButtonGroup
            label={formatCamelCaseToWords(
                getPropertyName<typeof VIBRATO_SCHEMA>('type'),
            )}
            title={VIBRATO_SCHEMA.type.label}
            value={effects.vibrato.type}
            onChange={(value) =>
                updateEffect('vibrato', {
                    type: value as 'sine' | 'square' | 'triangle' | 'sawtooth',
                })
            }
            options={['sine', 'square', 'triangle', 'sawtooth']}
        />
    );
};
