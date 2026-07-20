import { FEEDBACKDELAY_SCHEMA } from '@/constants/feedbackDelay.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatCamelCaseToWords, getPropertyName } from '@/utils';

const { format, parse } = createEffectTransform(
    FEEDBACKDELAY_SCHEMA.wet.factor,
    FEEDBACKDELAY_SCHEMA.wet.decimals,
);

export const WetSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label={formatCamelCaseToWords(
                getPropertyName<typeof FEEDBACKDELAY_SCHEMA>('wet'),
            )}
            title={FEEDBACKDELAY_SCHEMA.wet.label}
            value={effects.feedbackDelay.wet}
            onChange={(value) => updateEffect('feedbackDelay', { wet: value })}
            unit={FEEDBACKDELAY_SCHEMA.wet.unit}
            min={FEEDBACKDELAY_SCHEMA.wet.min}
            max={FEEDBACKDELAY_SCHEMA.wet.max}
            step={FEEDBACKDELAY_SCHEMA.wet.step}
            format={format}
            parse={parse}
            decimals={FEEDBACKDELAY_SCHEMA.wet.decimals}
        />
    );
};
