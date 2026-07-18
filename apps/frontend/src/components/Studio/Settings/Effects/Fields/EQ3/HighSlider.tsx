import { EQ3_SCHEMA } from '@/constants/eq3.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    EQ3_SCHEMA.high.factor,
    EQ3_SCHEMA.high.decimals,
);

export const HighSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Agudos"
            value={effects.eq3.high}
            onChange={(value) => updateEffect('eq3', { high: value })}
            unit={EQ3_SCHEMA.high.unit}
            min={EQ3_SCHEMA.high.min}
            max={EQ3_SCHEMA.high.max}
            step={EQ3_SCHEMA.high.step}
            format={format}
            parse={parse}
            decimals={EQ3_SCHEMA.high.decimals}
        />
    );
};
