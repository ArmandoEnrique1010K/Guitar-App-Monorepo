import { DISTORTION_SCHEMA } from '@/constants/effects/distortion.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    DISTORTION_SCHEMA.distortion.factor,
    DISTORTION_SCHEMA.distortion.decimals,
);

export const DistortionSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Distorsión"
            value={effects.distortion.distortion}
            unit={DISTORTION_SCHEMA.distortion.unit}
            min={DISTORTION_SCHEMA.distortion.min}
            max={DISTORTION_SCHEMA.distortion.max}
            step={DISTORTION_SCHEMA.distortion.step}
            decimals={DISTORTION_SCHEMA.distortion.decimals}
            onChange={(value) =>
                updateEffect('distortion', { distortion: value })
            }
            format={format}
            parse={parse}
        />
    );
};
