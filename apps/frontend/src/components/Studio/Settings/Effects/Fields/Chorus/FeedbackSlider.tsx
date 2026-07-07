import { CHORUS_SCHEMA } from '@/constants/chorus.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    CHORUS_SCHEMA.feedback.factor,
    CHORUS_SCHEMA.feedback.decimals,
);

export const FeedbackSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Retroalimentación"
            value={effects.chorus.feedback}
            onChange={(value) => updateEffect('chorus', { feedback: value })}
            unit={CHORUS_SCHEMA.feedback.unit}
            min={CHORUS_SCHEMA.feedback.min}
            max={CHORUS_SCHEMA.feedback.max}
            step={CHORUS_SCHEMA.feedback.step}
            format={format}
            parse={parse}
            decimals={CHORUS_SCHEMA.feedback.decimals}
        />
    );
};
