import { CHORUS_SCHEMA } from '@/constants/chorus.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatCamelCaseToWords, getPropertyName } from '@/utils';

const { format, parse } = createEffectTransform(
    CHORUS_SCHEMA.wet.factor,
    CHORUS_SCHEMA.wet.decimals,
);

export const WetSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label={formatCamelCaseToWords(
                getPropertyName<typeof CHORUS_SCHEMA>('wet'),
            )}
            title={CHORUS_SCHEMA.wet.label}
            value={effects.chorus.wet}
            onChange={(value) => updateEffect('chorus', { wet: value })}
            unit={CHORUS_SCHEMA.wet.unit}
            min={CHORUS_SCHEMA.wet.min}
            max={CHORUS_SCHEMA.wet.max}
            step={CHORUS_SCHEMA.wet.step}
            format={format}
            parse={parse}
            decimals={CHORUS_SCHEMA.wet.decimals}
        />
    );
};
