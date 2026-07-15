import { AUTOFILTER_SCHEMA } from '@/constants/autoFilter.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    AUTOFILTER_SCHEMA.depth.factor,
    AUTOFILTER_SCHEMA.depth.decimals,
);
export const DepthSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Profundidad"
            value={effects.autoFilter.depth}
            onChange={(value) => updateEffect('autoFilter', { depth: value })}
            unit={AUTOFILTER_SCHEMA.depth.unit}
            min={AUTOFILTER_SCHEMA.depth.min}
            max={AUTOFILTER_SCHEMA.depth.max}
            step={AUTOFILTER_SCHEMA.depth.step}
            format={format}
            parse={parse}
            decimals={AUTOFILTER_SCHEMA.depth.decimals}
        />
    );
};
