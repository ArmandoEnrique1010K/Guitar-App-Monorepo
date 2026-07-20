import { FREEVERB_SCHEMA } from '@/constants/freeverb.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatCamelCaseToWords, getPropertyName } from '@/utils';

const { format, parse } = createEffectTransform(
    FREEVERB_SCHEMA.wet.factor,
    FREEVERB_SCHEMA.wet.decimals,
);

export const WetSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label={formatCamelCaseToWords(
                getPropertyName<typeof FREEVERB_SCHEMA>('wet'),
            )}
            title={FREEVERB_SCHEMA.wet.label}
            value={effects.freeverb.wet}
            onChange={(value) => updateEffect('freeverb', { wet: value })}
            unit={FREEVERB_SCHEMA.wet.unit}
            min={FREEVERB_SCHEMA.wet.min}
            max={FREEVERB_SCHEMA.wet.max}
            step={FREEVERB_SCHEMA.wet.step}
            format={format}
            parse={parse}
            decimals={FREEVERB_SCHEMA.wet.decimals}
        />
    );
};
