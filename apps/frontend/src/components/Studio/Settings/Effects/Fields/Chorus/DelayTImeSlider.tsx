import { CHORUS_SCHEMA } from '@/constants/effects/chorus.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    CHORUS_SCHEMA.delayTime.factor,
    CHORUS_SCHEMA.delayTime.decimals,
);

export const DelayTImeSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Retraso"
            value={effects.chorus.delayTime}
            onChange={(value) => updateEffect('chorus', { delayTime: value })}
            unit={CHORUS_SCHEMA.delayTime.unit}
            min={CHORUS_SCHEMA.delayTime.min}
            max={CHORUS_SCHEMA.delayTime.max}
            step={CHORUS_SCHEMA.delayTime.step}
            format={format}
            parse={parse}
            decimals={CHORUS_SCHEMA.delayTime.decimals}
        />
    );
};
