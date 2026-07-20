import { REVERB_SCHEMA } from '@/constants/reverb.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatCamelCaseToWords, getPropertyName } from '@/utils';

const { format, parse } = createEffectTransform(
    REVERB_SCHEMA.wet.factor,
    REVERB_SCHEMA.wet.decimals,
);

export const WetSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label={formatCamelCaseToWords(
                getPropertyName<typeof REVERB_SCHEMA>('wet'),
            )}
            title={REVERB_SCHEMA.wet.label}
            value={effects.reverb.wet}
            onChange={(value) => updateEffect('reverb', { wet: value })}
            unit={REVERB_SCHEMA.wet.unit}
            min={REVERB_SCHEMA.wet.min}
            max={REVERB_SCHEMA.wet.max}
            step={REVERB_SCHEMA.wet.step}
            format={format}
            parse={parse}
            decimals={REVERB_SCHEMA.wet.decimals}
        />
    );
};
