import { TREMOLO_SCHEMA } from '@/constants/tremolo.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatCamelCaseToWords, getPropertyName } from '@/utils';

const { format, parse } = createEffectTransform(
    TREMOLO_SCHEMA.frequency.factor,
    TREMOLO_SCHEMA.frequency.decimals,
);

export const FrequencySlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label={formatCamelCaseToWords(
                getPropertyName<typeof TREMOLO_SCHEMA>('frequency'),
            )}
            title={TREMOLO_SCHEMA.frequency.label}
            value={effects.tremolo.frequency}
            onChange={(value) => updateEffect('tremolo', { frequency: value })}
            unit={TREMOLO_SCHEMA.frequency.unit}
            min={TREMOLO_SCHEMA.frequency.min}
            max={TREMOLO_SCHEMA.frequency.max}
            step={TREMOLO_SCHEMA.frequency.step}
            format={format}
            parse={parse}
            decimals={TREMOLO_SCHEMA.frequency.decimals}
        />
    );
};
