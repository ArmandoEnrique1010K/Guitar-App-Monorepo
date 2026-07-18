import { PINGPONGDELAY_SCHEMA } from '@/constants/pingPongDelay.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    PINGPONGDELAY_SCHEMA.wet.factor,
    PINGPONGDELAY_SCHEMA.wet.decimals,
);

export const WetSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Límite"
            value={effects.pingPongDelay.wet}
            onChange={(value) => updateEffect('pingPongDelay', { wet: value })}
            unit={PINGPONGDELAY_SCHEMA.wet.unit}
            min={PINGPONGDELAY_SCHEMA.wet.min}
            max={PINGPONGDELAY_SCHEMA.wet.max}
            step={PINGPONGDELAY_SCHEMA.wet.step}
            format={format}
            parse={parse}
            decimals={PINGPONGDELAY_SCHEMA.wet.decimals}
        />
    );
};
