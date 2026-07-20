import { CHORUS_SCHEMA } from '@/constants/chorus.constants';
import { useEffects } from '@/hooks';
import { HorizontalButtonGroup } from '@/ui';
import { formatCamelCaseToWords, getPropertyName } from '@/utils';

export const TypeSelectButtons = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalButtonGroup
            label={formatCamelCaseToWords(
                getPropertyName<typeof CHORUS_SCHEMA>('type'),
            )}
            title={CHORUS_SCHEMA.type.label}
            value={effects.chorus.type}
            onChange={(value) =>
                updateEffect('chorus', {
                    type: value as 'sine' | 'square' | 'triangle' | 'sawtooth',
                })
            }
            options={['sine', 'square', 'triangle', 'sawtooth']}
        />
    );
};
