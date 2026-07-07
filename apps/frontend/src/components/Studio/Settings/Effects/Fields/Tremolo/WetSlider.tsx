import { TREMOLO_SCHEMA } from '@/constants/tremolo.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    TREMOLO_SCHEMA.wet.factor,
    TREMOLO_SCHEMA.wet.decimals,
);

export const WetSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Límite"
            value={effects.tremolo.wet}
            onChange={(value) => updateEffect('tremolo', { wet: value })}
            unit={TREMOLO_SCHEMA.wet.unit}
            min={TREMOLO_SCHEMA.wet.min}
            max={TREMOLO_SCHEMA.wet.max}
            step={TREMOLO_SCHEMA.wet.step}
            format={format}
            parse={parse}
            decimals={TREMOLO_SCHEMA.wet.decimals}
        />
    );
};
