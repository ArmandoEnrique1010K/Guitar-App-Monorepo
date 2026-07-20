import { CHORUS_SCHEMA } from '@/constants/chorus.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatCamelCaseToWords, getPropertyName } from '@/utils';

const { format, parse } = createEffectTransform(
    CHORUS_SCHEMA.frequency.factor,
    CHORUS_SCHEMA.frequency.decimals,
);

export const FrequencySlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label={formatCamelCaseToWords(
                getPropertyName<typeof CHORUS_SCHEMA>('frequency'),
            )}
            title={CHORUS_SCHEMA.frequency.label}
            value={effects.chorus.frequency}
            onChange={(value) => updateEffect('chorus', { frequency: value })}
            unit={CHORUS_SCHEMA.frequency.unit}
            min={CHORUS_SCHEMA.frequency.min}
            max={CHORUS_SCHEMA.frequency.max}
            step={CHORUS_SCHEMA.frequency.step}
            format={format}
            parse={parse}
            decimals={CHORUS_SCHEMA.frequency.decimals}
        />
    );
};
