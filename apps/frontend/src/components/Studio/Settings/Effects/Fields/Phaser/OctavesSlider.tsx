import { PHASER_SCHEMA } from '@/constants/phaser.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatCamelCaseToWords, getPropertyName } from '@/utils';

const { format, parse } = createEffectTransform(
    PHASER_SCHEMA.octaves.factor,
    PHASER_SCHEMA.octaves.decimals,
);

export const OctavesSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label={formatCamelCaseToWords(
                getPropertyName<typeof PHASER_SCHEMA>('octaves'),
            )}
            title={PHASER_SCHEMA.octaves.label}
            value={effects.phaser.octaves}
            onChange={(value) => updateEffect('phaser', { octaves: value })}
            unit={PHASER_SCHEMA.octaves.unit}
            min={PHASER_SCHEMA.octaves.min}
            max={PHASER_SCHEMA.octaves.max}
            step={PHASER_SCHEMA.octaves.step}
            format={format}
            parse={parse}
            decimals={PHASER_SCHEMA.octaves.decimals}
        />
    );
};
