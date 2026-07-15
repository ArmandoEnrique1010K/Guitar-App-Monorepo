import { useEffects } from '@/hooks';
import { HorizontalButtonGroup } from '@/ui';

export const TypeSelectButtons = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalButtonGroup
            label="Tipo"
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
