import { COMPRESSOR_SCHEMA } from '@/constants/compressor.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    COMPRESSOR_SCHEMA.release.factor,
    COMPRESSOR_SCHEMA.release.decimals,
);

export const ReleaseSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Liberación"
            value={effects.compressor.release}
            onChange={(value) => updateEffect('compressor', { release: value })}
            unit={COMPRESSOR_SCHEMA.release.unit}
            min={COMPRESSOR_SCHEMA.release.min}
            max={COMPRESSOR_SCHEMA.release.max}
            step={COMPRESSOR_SCHEMA.release.step}
            format={format}
            parse={parse}
            decimals={COMPRESSOR_SCHEMA.release.decimals}
        />
    );
};
