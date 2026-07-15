import { FEEDBACKDELAY_SCHEMA } from '@/constants/feedbackDelay.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    FEEDBACKDELAY_SCHEMA.delayTime.factor,
    FEEDBACKDELAY_SCHEMA.delayTime.decimals,
);

export const DelayTimeSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Retrazo"
            value={effects.feedbackDelay.delayTime}
            onChange={(value) =>
                updateEffect('feedbackDelay', { delayTime: value })
            }
            unit={FEEDBACKDELAY_SCHEMA.delayTime.unit}
            min={FEEDBACKDELAY_SCHEMA.delayTime.min}
            max={FEEDBACKDELAY_SCHEMA.delayTime.max}
            step={FEEDBACKDELAY_SCHEMA.delayTime.step}
            format={format}
            parse={parse}
            decimals={FEEDBACKDELAY_SCHEMA.delayTime.decimals}
        />
    );
};
