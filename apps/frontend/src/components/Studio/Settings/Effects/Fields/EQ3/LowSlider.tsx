import { EQ3_SCHEMA } from '@/constants/eq3.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    EQ3_SCHEMA.low.factor,
    EQ3_SCHEMA.low.decimals,
);

export const LowSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Graves"
            value={effects.eq3.low}
            onChange={(value) => updateEffect('eq3', { low: value })}
            unit={EQ3_SCHEMA.low.unit}
            min={EQ3_SCHEMA.low.min}
            max={EQ3_SCHEMA.low.max}
            step={EQ3_SCHEMA.low.step}
            format={format}
            parse={parse}
            decimals={EQ3_SCHEMA.low.decimals}
        />
    );
};
