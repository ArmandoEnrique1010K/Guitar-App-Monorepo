import { useEffects } from '@/hooks';
import { HorizontalButtonGroup } from '@/ui';

export const TypeSelectButtons = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalButtonGroup
            label="Tipo"
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
