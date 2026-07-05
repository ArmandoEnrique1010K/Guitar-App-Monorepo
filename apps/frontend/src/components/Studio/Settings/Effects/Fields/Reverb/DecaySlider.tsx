import { REVERB_SCHEMA } from '@/constants/effects/reverb.constants';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatEffectValue, parseEffectValue } from '@/utils';

export const DecaySlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Caida"
            value={effects.reverb.decay}
            onChange={(value) => updateEffect('reverb', { decay: value })}
            unit={REVERB_SCHEMA.decay.unit}
            min={REVERB_SCHEMA.decay.min}
            max={REVERB_SCHEMA.decay.max}
            step={REVERB_SCHEMA.decay.step}
            // formatedValue={formatEffectValue(
            //     effects.reverb.decay,
            //     REVERB_SCHEMA.decay.factor,
            //     REVERB_SCHEMA.decay.decimals,
            // )}
            format={(v) =>
                formatEffectValue(
                    v,
                    REVERB_SCHEMA.decay.factor,
                    REVERB_SCHEMA.decay.decimals,
                )
            }
            parse={(v) => parseEffectValue(v, REVERB_SCHEMA.decay.factor)}
            decimals={REVERB_SCHEMA.decay.decimals}
            factor={REVERB_SCHEMA.decay.factor}
        />
    );
};
