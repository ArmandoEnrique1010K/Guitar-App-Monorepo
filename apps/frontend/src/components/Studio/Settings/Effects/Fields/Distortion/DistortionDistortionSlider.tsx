import { DISTORTION_SCHEMA } from '@/constants/distortion.constants';
import { useEffects } from '@/hooks/useEffects';
import { HorizontalSlider } from '@/ui/Studio/HorizontalSlider';
import { formatEffectValue } from '@/utils/formatEffectValue';

export const DistortionDistortionSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Distorsión"
            value={effects.distortion.distortion}
            onChange={(value) =>
                updateEffect('distortion', { distortion: value })
            }
            unit={DISTORTION_SCHEMA.distortion.unit}
            min={DISTORTION_SCHEMA.distortion.min}
            max={DISTORTION_SCHEMA.distortion.max}
            step={DISTORTION_SCHEMA.distortion.step}
            formatedValue={formatEffectValue(
                effects.distortion.distortion,
                DISTORTION_SCHEMA.distortion.factor,
                DISTORTION_SCHEMA.distortion.decimals,
            )}
        />
    );
};
