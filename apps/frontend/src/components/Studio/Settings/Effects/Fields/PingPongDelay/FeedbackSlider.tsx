import { PINGPONGDELAY_SCHEMA } from '@/constants/pingPongDelay.contants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    PINGPONGDELAY_SCHEMA.feedback.factor,
    PINGPONGDELAY_SCHEMA.feedback.decimals,
);

export const FeedbackSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Retroalimentación"
            value={effects.pingPongDelay.feedback}
            onChange={(value) =>
                updateEffect('pingPongDelay', { feedback: value })
            }
            unit={PINGPONGDELAY_SCHEMA.feedback.unit}
            min={PINGPONGDELAY_SCHEMA.feedback.min}
            max={PINGPONGDELAY_SCHEMA.feedback.max}
            step={PINGPONGDELAY_SCHEMA.feedback.step}
            format={format}
            parse={parse}
            decimals={PINGPONGDELAY_SCHEMA.feedback.decimals}
        />
    );
};
