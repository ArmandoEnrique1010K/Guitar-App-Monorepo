import { FREEVERB_SCHEMA } from '@/constants/freeverb.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    FREEVERB_SCHEMA.dampening.factor,
    FREEVERB_SCHEMA.dampening.decimals,
);

export const DampeningSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Amortiguamiento"
            value={effects.freeverb.dampening}
            onChange={(value) => updateEffect('freeverb', { dampening: value })}
            unit={FREEVERB_SCHEMA.dampening.unit}
            min={FREEVERB_SCHEMA.dampening.min}
            max={FREEVERB_SCHEMA.dampening.max}
            step={FREEVERB_SCHEMA.dampening.step}
            format={format}
            parse={parse}
            decimals={FREEVERB_SCHEMA.dampening.decimals}
        />
    );
};
