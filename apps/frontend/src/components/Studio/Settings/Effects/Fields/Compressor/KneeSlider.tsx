import { COMPRESSOR_SCHEMA } from '@/constants/compressor.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatCamelCaseToWords, getPropertyName } from '@/utils';

const { format, parse } = createEffectTransform(
    COMPRESSOR_SCHEMA.knee.factor,
    COMPRESSOR_SCHEMA.knee.decimals,
);

export const KneeSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label={formatCamelCaseToWords(
                getPropertyName<typeof COMPRESSOR_SCHEMA>('knee'),
            )}
            title={COMPRESSOR_SCHEMA.knee.label}
            value={effects.compressor.knee}
            onChange={(value) => updateEffect('compressor', { knee: value })}
            unit={COMPRESSOR_SCHEMA.knee.unit}
            min={COMPRESSOR_SCHEMA.knee.min}
            max={COMPRESSOR_SCHEMA.knee.max}
            step={COMPRESSOR_SCHEMA.knee.step}
            format={format}
            parse={parse}
            decimals={COMPRESSOR_SCHEMA.knee.decimals}
        />
    );
};
