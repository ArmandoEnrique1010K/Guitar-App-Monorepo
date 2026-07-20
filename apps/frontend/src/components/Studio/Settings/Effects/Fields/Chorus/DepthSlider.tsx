import { CHORUS_SCHEMA } from '@/constants/chorus.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatCamelCaseToWords, getPropertyName } from '@/utils';

const { format, parse } = createEffectTransform(
    CHORUS_SCHEMA.depth.factor,
    CHORUS_SCHEMA.depth.decimals,
);
export const DepthSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label={formatCamelCaseToWords(
                getPropertyName<typeof CHORUS_SCHEMA>('depth'),
            )}
            title={CHORUS_SCHEMA.depth.label}
            value={effects.chorus.depth}
            onChange={(value) => updateEffect('chorus', { depth: value })}
            unit={CHORUS_SCHEMA.depth.unit}
            min={CHORUS_SCHEMA.depth.min}
            max={CHORUS_SCHEMA.depth.max}
            step={CHORUS_SCHEMA.depth.step}
            format={format}
            parse={parse}
            decimals={CHORUS_SCHEMA.depth.decimals}
        />
    );
};
