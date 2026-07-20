import { FREEVERB_SCHEMA } from '@/constants/freeverb.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatCamelCaseToWords, getPropertyName } from '@/utils';

const { format, parse } = createEffectTransform(
    FREEVERB_SCHEMA.dampening.factor,
    FREEVERB_SCHEMA.dampening.decimals,
);

export const DampeningSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label={formatCamelCaseToWords(
                getPropertyName<typeof FREEVERB_SCHEMA>('dampening'),
            )}
            title={FREEVERB_SCHEMA.dampening.label}
            value={effects.freeverb.dampening}
            onChange={(value) => updateEffect('freeverb', { dampening: value })}
            unit={FREEVERB_SCHEMA.dampening.unit}
            min={FREEVERB_SCHEMA.dampening.min}
            max={FREEVERB_SCHEMA.dampening.max}
            step={FREEVERB_SCHEMA.dampening.step}
            format={format}
            parse={parse}
            decimals={FREEVERB_SCHEMA.dampening.decimals}
        />
    );
};
