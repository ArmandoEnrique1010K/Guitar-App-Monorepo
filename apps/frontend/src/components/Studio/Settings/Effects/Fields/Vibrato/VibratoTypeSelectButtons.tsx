import { useEffects } from '@/hooks/useEffects';
import { HorizontalSelectButtons } from '@/ui/Studio/HorizontalSelectButtons';

export const VibratoTypeSelectButtons = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSelectButtons
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
