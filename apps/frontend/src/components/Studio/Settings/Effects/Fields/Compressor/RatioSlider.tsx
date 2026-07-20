import { COMPRESSOR_SCHEMA } from '@/constants/compressor.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatCamelCaseToWords, getPropertyName } from '@/utils';

const { format, parse } = createEffectTransform(
    COMPRESSOR_SCHEMA.ratio.factor,
    COMPRESSOR_SCHEMA.ratio.decimals,
);

export const RatioSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label={formatCamelCaseToWords(
                getPropertyName<typeof COMPRESSOR_SCHEMA>('ratio'),
            )}
            title={COMPRESSOR_SCHEMA.ratio.label}
            value={effects.compressor.ratio}
            onChange={(value) => updateEffect('compressor', { ratio: value })}
            unit={COMPRESSOR_SCHEMA.ratio.unit}
            min={COMPRESSOR_SCHEMA.ratio.min}
            max={COMPRESSOR_SCHEMA.ratio.max}
            step={COMPRESSOR_SCHEMA.ratio.step}
            format={format}
            parse={parse}
            decimals={COMPRESSOR_SCHEMA.ratio.decimals}
        />
    );
};
