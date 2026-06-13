import { useEffects } from '@/hooks/useEffects';
import { HorizontalSelectButtons } from '@/ui/Studio/HorizontalSelectButtons';

export const TypeSelectButtons = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSelectButtons
            label="Tipo"
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
