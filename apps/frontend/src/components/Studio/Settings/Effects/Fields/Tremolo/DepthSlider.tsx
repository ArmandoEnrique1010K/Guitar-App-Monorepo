import { TREMOLO_SCHEMA } from '@/constants/tremolo.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    TREMOLO_SCHEMA.depth.factor,
    TREMOLO_SCHEMA.depth.decimals,
);

export const DepthSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Profundidad"
            value={effects.tremolo.depth}
            onChange={(value) => updateEffect('tremolo', { depth: value })}
            unit={TREMOLO_SCHEMA.depth.unit}
            min={TREMOLO_SCHEMA.depth.min}
            max={TREMOLO_SCHEMA.depth.max}
            step={TREMOLO_SCHEMA.depth.step}
            format={format}
            parse={parse}
            decimals={TREMOLO_SCHEMA.depth.decimals}
        />
    );
};
