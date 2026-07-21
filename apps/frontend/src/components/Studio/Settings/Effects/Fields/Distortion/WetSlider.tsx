import { DISTORTION_SCHEMA } from '@/constants/distortion.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatCamelCaseToWords, getPropertyName } from '@/utils';

const { format, parse } = createEffectTransform(
    DISTORTION_SCHEMA.wet.factor,
    DISTORTION_SCHEMA.wet.decimals,
);

export const WetSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label={formatCamelCaseToWords(
                getPropertyName<typeof DISTORTION_SCHEMA>('wet'),
            )}
            title={DISTORTION_SCHEMA.wet.label}
            value={effects.distortion.wet}
            onChange={(value) => updateEffect('distortion', { wet: value })}
            unit={DISTORTION_SCHEMA.wet.unit}
            min={DISTORTION_SCHEMA.wet.min}
            max={DISTORTION_SCHEMA.wet.max}
            step={DISTORTION_SCHEMA.wet.step}
            format={format}
            parse={parse}
            decimals={DISTORTION_SCHEMA.wet.decimals}
        />
    );
};
