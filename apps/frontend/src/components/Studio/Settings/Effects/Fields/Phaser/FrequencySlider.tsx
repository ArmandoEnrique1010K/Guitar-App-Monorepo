import { PHASER_SCHEMA } from '@/constants/phaser.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    PHASER_SCHEMA.frequency.factor,
    PHASER_SCHEMA.frequency.decimals,
);

export const FrequencySlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Frequencia"
            value={effects.phaser.frequency}
            onChange={(value) => updateEffect('phaser', { frequency: value })}
            unit={PHASER_SCHEMA.frequency.unit}
            min={PHASER_SCHEMA.frequency.min}
            max={PHASER_SCHEMA.frequency.max}
            step={PHASER_SCHEMA.frequency.step}
            format={format}
            parse={parse}
            decimals={PHASER_SCHEMA.frequency.decimals}
        />
    );
};
