import { REVERB_SCHEMA } from '@/constants/effects/reverb.constants';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatEffectValue, parseEffectValue } from '@/utils';

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
            // formatedValue={formatEffectValue(
            //     effects.reverb.preDelay,
            //     REVERB_SCHEMA.preDelay.factor,
            //     REVERB_SCHEMA.preDelay.decimals,
            // )}
            format={(v) =>
                formatEffectValue(
                    v,
                    REVERB_SCHEMA.preDelay.factor,
                    REVERB_SCHEMA.preDelay.decimals,
                )
            }
            parse={(v) => parseEffectValue(v, REVERB_SCHEMA.preDelay.factor)}
            decimals={REVERB_SCHEMA.preDelay.decimals}
            factor={REVERB_SCHEMA.preDelay.factor}
        />
    );
};
