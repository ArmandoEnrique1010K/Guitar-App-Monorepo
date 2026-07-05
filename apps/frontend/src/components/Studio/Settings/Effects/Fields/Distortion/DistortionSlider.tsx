import { DISTORTION_SCHEMA } from '@/constants/effects/distortion.constants';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatEffectValue, parseEffectValue } from '@/utils';

export const DistortionSlider = () => {
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
            // factor={DISTORTION_SCHEMA.distortion.factor}
            // decimals={DISTORTION_SCHEMA.distortion.decimals}
            // formatedValue={formatEffectValue(
            //     effects.distortion.distortion,
            //     DISTORTION_SCHEMA.distortion.factor,
            //     DISTORTION_SCHEMA.distortion.decimals,
            // )}
            format={(v) =>
                formatEffectValue(
                    v,
                    DISTORTION_SCHEMA.distortion.factor,
                    DISTORTION_SCHEMA.distortion.decimals,
                )
            }
            parse={(v) =>
                parseEffectValue(v, DISTORTION_SCHEMA.distortion.factor)
            }
            decimals={DISTORTION_SCHEMA.distortion.decimals}
            factor={DISTORTION_SCHEMA.distortion.factor}
        />
    );
};
