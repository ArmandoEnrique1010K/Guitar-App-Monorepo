import { PHASER_SCHEMA } from '@/constants/phaser.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    PHASER_SCHEMA.Q.factor,
    PHASER_SCHEMA.Q.decimals,
);

export const QSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Resonancia"
            value={effects.phaser.q}
            onChange={(value) => updateEffect('phaser', { q: value })}
            unit={PHASER_SCHEMA.Q.unit}
            min={PHASER_SCHEMA.Q.min}
            max={PHASER_SCHEMA.Q.max}
            step={PHASER_SCHEMA.Q.step}
            format={format}
            parse={parse}
            decimals={PHASER_SCHEMA.Q.decimals}
        />
    );
};
