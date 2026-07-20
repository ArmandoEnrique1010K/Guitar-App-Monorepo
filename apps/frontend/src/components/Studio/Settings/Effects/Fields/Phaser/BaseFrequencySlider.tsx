import { PHASER_SCHEMA } from '@/constants/phaser.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatCamelCaseToWords, getPropertyName } from '@/utils';

const { format, parse } = createEffectTransform(
    PHASER_SCHEMA.baseFrequency.factor,
    PHASER_SCHEMA.baseFrequency.decimals,
);

export const BaseFrequencySlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label={formatCamelCaseToWords(
                getPropertyName<typeof PHASER_SCHEMA>('baseFrequency'),
            )}
            title={PHASER_SCHEMA.baseFrequency.label}
            value={effects.phaser.baseFrequency}
            onChange={(value) =>
                updateEffect('phaser', { baseFrequency: value })
            }
            unit={PHASER_SCHEMA.baseFrequency.unit}
            min={PHASER_SCHEMA.baseFrequency.min}
            max={PHASER_SCHEMA.baseFrequency.max}
            step={PHASER_SCHEMA.baseFrequency.step}
            format={format}
            parse={parse}
            decimals={PHASER_SCHEMA.baseFrequency.decimals}
        />
    );
};
