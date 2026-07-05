import { DISTORTION_SCHEMA } from '@/constants/effects/distortion.constants';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatEffectValue, parseEffectValue } from '@/utils';

export const WetSlider = () => {
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
            format={(v) =>
                formatEffectValue(
                    v,
                    DISTORTION_SCHEMA.wet.factor,
                    DISTORTION_SCHEMA.wet.decimals,
                )
            }
            parse={(v) => parseEffectValue(v, DISTORTION_SCHEMA.wet.factor)}
            decimals={DISTORTION_SCHEMA.wet.decimals}
            factor={DISTORTION_SCHEMA.wet.factor}

            // formatedValue={formatEffectValue(
            //     effects.wet.wet,
            //     DISTORTION_SCHEMA.wet.factor,
            //     DISTORTION_SCHEMA.wet.decimals,
            // )}
        />
    );
};
