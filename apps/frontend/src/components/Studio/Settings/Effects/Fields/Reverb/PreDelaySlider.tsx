import { REVERB_SCHEMA } from '@/constants/reverb.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    REVERB_SCHEMA.preDelay.factor,
    REVERB_SCHEMA.preDelay.decimals,
);

export const PreDelaySlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Retraso"
            value={effects.reverb.preDelay}
            onChange={(value) => updateEffect('reverb', { preDelay: value })}
            unit={REVERB_SCHEMA.preDelay.unit}
            min={REVERB_SCHEMA.preDelay.min}
            max={REVERB_SCHEMA.preDelay.max}
            step={REVERB_SCHEMA.preDelay.step}
            format={format}
            parse={parse}
            decimals={REVERB_SCHEMA.preDelay.decimals}
        />
    );
};
