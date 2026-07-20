import { REVERB_SCHEMA } from '@/constants/reverb.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatCamelCaseToWords, getPropertyName } from '@/utils';

const { format, parse } = createEffectTransform(
    REVERB_SCHEMA.preDelay.factor,
    REVERB_SCHEMA.preDelay.decimals,
);

export const PreDelaySlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label={formatCamelCaseToWords(
                getPropertyName<typeof REVERB_SCHEMA>('preDelay'),
            )}
            title={REVERB_SCHEMA.preDelay.label}
            value={effects.reverb.preDelay}
            onChange={(value) => updateEffect('reverb', { preDelay: value })}
            unit={REVERB_SCHEMA.preDelay.unit}
            min={REVERB_SCHEMA.preDelay.min}
            max={REVERB_SCHEMA.preDelay.max}
            step={REVERB_SCHEMA.preDelay.step}
            format={format}
            parse={parse}
            decimals={REVERB_SCHEMA.preDelay.decimals}
        />
    );
};
