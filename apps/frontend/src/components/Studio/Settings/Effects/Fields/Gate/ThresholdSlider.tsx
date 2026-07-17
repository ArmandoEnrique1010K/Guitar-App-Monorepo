import { GATE_SCHEMA } from '@/constants/gate.contants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    GATE_SCHEMA.threshold.factor,
    GATE_SCHEMA.threshold.decimals,
);

export const ThresholdSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Umbral"
            value={effects.gate.threshold}
            onChange={(value) => updateEffect('gate', { threshold: value })}
            unit={GATE_SCHEMA.threshold.unit}
            min={GATE_SCHEMA.threshold.min}
            max={GATE_SCHEMA.threshold.max}
            step={GATE_SCHEMA.threshold.step}
            format={format}
            parse={parse}
            decimals={GATE_SCHEMA.threshold.decimals}
        />
    );
};
