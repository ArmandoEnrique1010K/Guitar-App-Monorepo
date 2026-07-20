import { COMPRESSOR_SCHEMA } from '@/constants/compressor.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatCamelCaseToWords, getPropertyName } from '@/utils';

const { format, parse } = createEffectTransform(
    COMPRESSOR_SCHEMA.threshold.factor,
    COMPRESSOR_SCHEMA.threshold.decimals,
);

export const ThresholdSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label={formatCamelCaseToWords(
                getPropertyName<typeof COMPRESSOR_SCHEMA>('threshold'),
            )}
            title={COMPRESSOR_SCHEMA.threshold.label}
            value={effects.compressor.threshold}
            onChange={(value) =>
                updateEffect('compressor', { threshold: value })
            }
            unit={COMPRESSOR_SCHEMA.threshold.unit}
            min={COMPRESSOR_SCHEMA.threshold.min}
            max={COMPRESSOR_SCHEMA.threshold.max}
            step={COMPRESSOR_SCHEMA.threshold.step}
            format={format}
            parse={parse}
            decimals={COMPRESSOR_SCHEMA.threshold.decimals}
        />
    );
};
