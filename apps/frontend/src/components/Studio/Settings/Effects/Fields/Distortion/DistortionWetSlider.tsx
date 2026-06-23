import { DISTORTION_SCHEMA } from '@/constants/distortion.constants';
import { useEffects } from '@/hooks/useEffects';
import { HorizontalSlider } from '@/ui/Studio/HorizontalSlider';
import { formatEffectValue } from '@/utils/formatEffectValue';

export const DistortionWetSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Límite"
            value={effects.distortion.wet}
            onChange={(value) => updateEffect('distortion', { wet: value })}
            unit={DISTORTION_SCHEMA.wet.unit}
            min={DISTORTION_SCHEMA.wet.min}
            max={DISTORTION_SCHEMA.wet.max}
            step={DISTORTION_SCHEMA.wet.step}
            formatedValue={formatEffectValue(
                effects.distortion.wet,
                DISTORTION_SCHEMA.wet.factor,
                DISTORTION_SCHEMA.wet.decimals,
            )}
        />
    );
};
