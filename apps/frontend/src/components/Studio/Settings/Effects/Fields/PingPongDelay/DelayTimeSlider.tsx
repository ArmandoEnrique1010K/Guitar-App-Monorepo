import { PINGPONGDELAY_SCHEMA } from '@/constants/pingPongDelay.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    PINGPONGDELAY_SCHEMA.delayTime.factor,
    PINGPONGDELAY_SCHEMA.delayTime.decimals,
);

export const DelayTimeSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Tiempo de retraso"
            value={effects.pingPongDelay.delayTime}
            onChange={(value) =>
                updateEffect('pingPongDelay', { delayTime: value })
            }
            unit={PINGPONGDELAY_SCHEMA.delayTime.unit}
            min={PINGPONGDELAY_SCHEMA.delayTime.min}
            max={PINGPONGDELAY_SCHEMA.delayTime.max}
            step={PINGPONGDELAY_SCHEMA.delayTime.step}
            format={format}
            parse={parse}
            decimals={PINGPONGDELAY_SCHEMA.delayTime.decimals}
        />
    );
};
