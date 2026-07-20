import { VIBRATO_SCHEMA } from '@/constants/vibrato.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatCamelCaseToWords, getPropertyName } from '@/utils';

const { format, parse } = createEffectTransform(
    VIBRATO_SCHEMA.depth.factor,
    VIBRATO_SCHEMA.depth.decimals,
);

export const DepthSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label={formatCamelCaseToWords(
                getPropertyName<typeof VIBRATO_SCHEMA>('depth'),
            )}
            title={VIBRATO_SCHEMA.depth.label}
            value={effects.vibrato.depth}
            onChange={(value) => updateEffect('vibrato', { depth: value })}
            unit={VIBRATO_SCHEMA.depth.unit}
            min={VIBRATO_SCHEMA.depth.min}
            max={VIBRATO_SCHEMA.depth.max}
            step={VIBRATO_SCHEMA.depth.step}
            format={format}
            parse={parse}
            decimals={VIBRATO_SCHEMA.depth.decimals}
        />
    );
};
