import { FEEDBACKDELAY_SCHEMA } from '@/constants/feedbackDelay.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    FEEDBACKDELAY_SCHEMA.feedback.factor,
    FEEDBACKDELAY_SCHEMA.feedback.decimals,
);

export const FeedbackSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Retroalimentación"
            value={effects.feedbackDelay.feedback}
            onChange={(value) =>
                updateEffect('feedbackDelay', { feedback: value })
            }
            unit={FEEDBACKDELAY_SCHEMA.feedback.unit}
            min={FEEDBACKDELAY_SCHEMA.feedback.min}
            max={FEEDBACKDELAY_SCHEMA.feedback.max}
            step={FEEDBACKDELAY_SCHEMA.feedback.step}
            format={format}
            parse={parse}
            decimals={FEEDBACKDELAY_SCHEMA.feedback.decimals}
        />
    );
};
