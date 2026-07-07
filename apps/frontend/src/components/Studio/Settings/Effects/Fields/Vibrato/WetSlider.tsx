import { VIBRATO_SCHEMA } from '@/constants/vibrato.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    VIBRATO_SCHEMA.wet.factor,
    VIBRATO_SCHEMA.wet.decimals,
);

export const WetSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Límite"
            value={effects.vibrato.wet}
            onChange={(value) => updateEffect('vibrato', { wet: value })}
            unit={VIBRATO_SCHEMA.wet.unit}
            min={VIBRATO_SCHEMA.wet.min}
            max={VIBRATO_SCHEMA.wet.max}
            step={VIBRATO_SCHEMA.wet.step}
            format={format}
            parse={parse}
            decimals={VIBRATO_SCHEMA.wet.decimals}
        />
    );
};
