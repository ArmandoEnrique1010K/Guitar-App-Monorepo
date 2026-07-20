import { GATE_SCHEMA } from '@/constants/gate.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatCamelCaseToWords, getPropertyName } from '@/utils';

const { format, parse } = createEffectTransform(
    GATE_SCHEMA.threshold.factor,
    GATE_SCHEMA.threshold.decimals,
);

export const ThresholdSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label={formatCamelCaseToWords(
                getPropertyName<typeof GATE_SCHEMA>('threshold'),
            )}
            title={GATE_SCHEMA.threshold.label}
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
