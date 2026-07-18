import { PITCHSHIFT_SCHEMA } from '@/constants/pitchShift.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    PITCHSHIFT_SCHEMA.delayTime.factor,
    PITCHSHIFT_SCHEMA.delayTime.decimals,
);

export const DelayTimeSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Tiempo de retraso"
            value={effects.pitchShift.delayTime}
            onChange={(value) =>
                updateEffect('pitchShift', { delayTime: value })
            }
            unit={PITCHSHIFT_SCHEMA.delayTime.unit}
            min={PITCHSHIFT_SCHEMA.delayTime.min}
            max={PITCHSHIFT_SCHEMA.delayTime.max}
            step={PITCHSHIFT_SCHEMA.delayTime.step}
            format={format}
            parse={parse}
            decimals={PITCHSHIFT_SCHEMA.delayTime.decimals}
        />
    );
};
