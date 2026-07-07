import { TREMOLO_SCHEMA } from '@/constants/tremolo.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    TREMOLO_SCHEMA.spread.factor,
    TREMOLO_SCHEMA.spread.decimals,
);

export const SpreadSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Angulo"
            value={effects.tremolo.spread}
            onChange={(value) => updateEffect('tremolo', { spread: value })}
            unit={TREMOLO_SCHEMA.spread.unit}
            min={TREMOLO_SCHEMA.spread.min}
            max={TREMOLO_SCHEMA.spread.max}
            step={TREMOLO_SCHEMA.spread.step}
            format={format}
            parse={parse}
            decimals={TREMOLO_SCHEMA.spread.decimals}
        />
    );
};
