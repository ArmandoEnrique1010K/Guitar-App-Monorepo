import { PITCHSHIFT_SCHEMA } from '@/constants/pitchShift.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    PITCHSHIFT_SCHEMA.feedback.factor,
    PITCHSHIFT_SCHEMA.feedback.decimals,
);

export const FeedbackSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Retroalimentación"
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
