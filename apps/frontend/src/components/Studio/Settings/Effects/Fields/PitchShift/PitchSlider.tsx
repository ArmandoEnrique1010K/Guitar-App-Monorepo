import { PITCHSHIFT_SCHEMA } from '@/constants/pitchShift.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatCamelCaseToWords, getPropertyName } from '@/utils';

const { format, parse } = createEffectTransform(
    PITCHSHIFT_SCHEMA.pitch.factor,
    PITCHSHIFT_SCHEMA.pitch.decimals,
);

export const PitchSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label={formatCamelCaseToWords(
                getPropertyName<typeof PITCHSHIFT_SCHEMA>('pitch'),
            )}
            title={PITCHSHIFT_SCHEMA.pitch.label}
            value={effects.pitchShift.pitch}
            onChange={(value) => updateEffect('pitchShift', { pitch: value })}
            unit={PITCHSHIFT_SCHEMA.pitch.unit}
            min={PITCHSHIFT_SCHEMA.pitch.min}
            max={PITCHSHIFT_SCHEMA.pitch.max}
            step={PITCHSHIFT_SCHEMA.pitch.step}
            format={format}
            parse={parse}
            decimals={PITCHSHIFT_SCHEMA.pitch.decimals}
        />
    );
};
