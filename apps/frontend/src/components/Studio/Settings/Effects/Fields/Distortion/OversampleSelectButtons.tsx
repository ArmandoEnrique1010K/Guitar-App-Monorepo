import { useEffects } from '@/hooks';
import { HorizontalButtonGroup } from '@/ui';

export const OversampleSelectButtons = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalButtonGroup
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
