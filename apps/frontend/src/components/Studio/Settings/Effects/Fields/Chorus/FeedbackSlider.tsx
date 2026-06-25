import { CHORUS_SCHEMA } from '@/constants/effects/chorus.constants';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatEffectValue } from '@/utils';

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
            formatedValue={formatEffectValue(
                effects.chorus.feedback,
                CHORUS_SCHEMA.feedback.factor,
                CHORUS_SCHEMA.feedback.decimals,
            )}
        />
    );
};
