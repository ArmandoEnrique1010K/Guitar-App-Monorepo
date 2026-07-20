import { TREMOLO_SCHEMA } from '@/constants/tremolo.constants';
import { useEffects } from '@/hooks';
import { HorizontalButtonGroup } from '@/ui';
import { formatCamelCaseToWords, getPropertyName } from '@/utils';

export const TypeSelectButtons = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalButtonGroup
            label={formatCamelCaseToWords(
                getPropertyName<typeof TREMOLO_SCHEMA>('type'),
            )}
            title={TREMOLO_SCHEMA.type.label}
            value={effects.tremolo.type}
            onChange={(value) =>
                updateEffect('tremolo', {
                    type: value as 'sine' | 'square' | 'triangle' | 'sawtooth',
                })
            }
            options={['sine', 'square', 'triangle', 'sawtooth']}
        />
    );
};
