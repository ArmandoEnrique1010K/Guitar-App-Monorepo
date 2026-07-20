import { EQ3_SCHEMA } from '@/constants/eq3.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatCamelCaseToWords, getPropertyName } from '@/utils';

const { format, parse } = createEffectTransform(
    EQ3_SCHEMA.mid.factor,
    EQ3_SCHEMA.mid.decimals,
);

export const MidSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label={formatCamelCaseToWords(
                getPropertyName<typeof EQ3_SCHEMA>('mid'),
            )}
            title={EQ3_SCHEMA.mid.label}
            value={effects.eq3.mid}
            onChange={(value) => updateEffect('eq3', { mid: value })}
            unit={EQ3_SCHEMA.mid.unit}
            min={EQ3_SCHEMA.mid.min}
            max={EQ3_SCHEMA.mid.max}
            step={EQ3_SCHEMA.mid.step}
            format={format}
            parse={parse}
            decimals={EQ3_SCHEMA.mid.decimals}
        />
    );
};
