import { PITCHSHIFT_SCHEMA } from '@/constants/pitchShift.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatCamelCaseToWords, getPropertyName } from '@/utils';

const { format, parse } = createEffectTransform(
    PITCHSHIFT_SCHEMA.feedback.factor,
    PITCHSHIFT_SCHEMA.feedback.decimals,
);

export const FeedbackSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label={formatCamelCaseToWords(
                getPropertyName<typeof PITCHSHIFT_SCHEMA>('feedback'),
            )}
            title={PITCHSHIFT_SCHEMA.feedback.label}
            value={effects.pitchShift.feedback}
            onChange={(value) =>
                updateEffect('pitchShift', { feedback: value })
            }
            unit={PITCHSHIFT_SCHEMA.feedback.unit}
            min={PITCHSHIFT_SCHEMA.feedback.min}
            max={PITCHSHIFT_SCHEMA.feedback.max}
            step={PITCHSHIFT_SCHEMA.feedback.step}
            format={format}
            parse={parse}
            decimals={PITCHSHIFT_SCHEMA.feedback.decimals}
        />
    );
};
