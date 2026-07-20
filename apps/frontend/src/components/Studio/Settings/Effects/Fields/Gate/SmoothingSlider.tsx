import { GATE_SCHEMA } from '@/constants/gate.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatCamelCaseToWords, getPropertyName } from '@/utils';

const { format, parse } = createEffectTransform(
    GATE_SCHEMA.smoothing.factor,
    GATE_SCHEMA.smoothing.decimals,
);

export const SmoothingSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label={formatCamelCaseToWords(
                getPropertyName<typeof GATE_SCHEMA>('smoothing'),
            )}
            title={GATE_SCHEMA.smoothing.label}
            value={effects.gate.smoothing}
            onChange={(value) => updateEffect('gate', { smoothing: value })}
            unit={GATE_SCHEMA.smoothing.unit}
            min={GATE_SCHEMA.smoothing.min}
            max={GATE_SCHEMA.smoothing.max}
            step={GATE_SCHEMA.smoothing.step}
            format={format}
            parse={parse}
            decimals={GATE_SCHEMA.smoothing.decimals}
        />
    );
};
