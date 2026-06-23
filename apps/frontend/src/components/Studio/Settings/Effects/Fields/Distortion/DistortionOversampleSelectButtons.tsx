import { useEffects } from '@/hooks/useEffects';
import { HorizontalSelectButtons } from '@/ui/Studio/HorizontalSelectButtons';

export const DistortionOversampleSelectButtons = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSelectButtons
            label="Sobremuestreo"
            value={effects.distortion.oversample as 'none' | '2x' | '4x'}
            onChange={(value) =>
                updateEffect('distortion', {
                    oversample: value as 'none' | '2x' | '4x',
                })
            }
            options={['none', '2x', '4x']}
        />
    );
};
