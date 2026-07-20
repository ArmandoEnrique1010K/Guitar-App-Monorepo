import { PHASER_SCHEMA } from '@/constants/phaser.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatCamelCaseToWords, getPropertyName } from '@/utils';

const { format, parse } = createEffectTransform(
    PHASER_SCHEMA.wet.factor,
    PHASER_SCHEMA.wet.decimals,
);

export const WetSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label={formatCamelCaseToWords(
                getPropertyName<typeof PHASER_SCHEMA>('wet'),
            )}
            title={PHASER_SCHEMA.wet.label}
            value={effects.phaser.wet}
            onChange={(value) => updateEffect('phaser', { wet: value })}
            unit={PHASER_SCHEMA.wet.unit}
            min={PHASER_SCHEMA.wet.min}
            max={PHASER_SCHEMA.wet.max}
            step={PHASER_SCHEMA.wet.step}
            format={format}
            parse={parse}
            decimals={PHASER_SCHEMA.wet.decimals}
        />
    );
};
