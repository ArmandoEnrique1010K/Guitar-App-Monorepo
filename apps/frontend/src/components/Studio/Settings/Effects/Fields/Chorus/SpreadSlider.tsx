import { CHORUS_SCHEMA } from '@/constants/effects/chorus.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    CHORUS_SCHEMA.spread.factor,
    CHORUS_SCHEMA.spread.decimals,
);

export const SpreadSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Angulo"
            value={effects.chorus.spread}
            onChange={(value) => updateEffect('chorus', { spread: value })}
            unit={CHORUS_SCHEMA.spread.unit}
            min={CHORUS_SCHEMA.spread.min}
            max={CHORUS_SCHEMA.spread.max}
            step={CHORUS_SCHEMA.spread.step}
            format={format}
            parse={parse}
            decimals={CHORUS_SCHEMA.spread.decimals}
        />
    );
};
