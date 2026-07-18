import { PITCHSHIFT_SCHEMA } from '@/constants/pitchShift.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    PITCHSHIFT_SCHEMA.wet.factor,
    PITCHSHIFT_SCHEMA.wet.decimals,
);

export const WetSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Límite"
            value={effects.pitchShift.wet}
            onChange={(value) => updateEffect('pitchShift', { wet: value })}
            unit={PITCHSHIFT_SCHEMA.wet.unit}
            min={PITCHSHIFT_SCHEMA.wet.min}
            max={PITCHSHIFT_SCHEMA.wet.max}
            step={PITCHSHIFT_SCHEMA.wet.step}
            format={format}
            parse={parse}
            decimals={PITCHSHIFT_SCHEMA.wet.decimals}
        />
    );
};
