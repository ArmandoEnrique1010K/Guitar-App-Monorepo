import { EQ3_SCHEMA } from '@/constants/eq3.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    EQ3_SCHEMA.highFrequency.factor,
    EQ3_SCHEMA.highFrequency.decimals,
);

export const HighFrequencySlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Frecuencia entre M. y A."
            value={effects.eq3.highFrequency}
            onChange={(value) => updateEffect('eq3', { highFrequency: value })}
            unit={EQ3_SCHEMA.highFrequency.unit}
            min={EQ3_SCHEMA.highFrequency.min}
            max={EQ3_SCHEMA.highFrequency.max}
            step={EQ3_SCHEMA.highFrequency.step}
            format={format}
            parse={parse}
            decimals={EQ3_SCHEMA.highFrequency.decimals}
        />
    );
};
