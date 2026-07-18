import { COMPRESSOR_SCHEMA } from '@/constants/compressor.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    COMPRESSOR_SCHEMA.attack.factor,
    COMPRESSOR_SCHEMA.attack.decimals,
);

export const AttackSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Ataque"
            value={effects.compressor.attack}
            onChange={(value) => updateEffect('compressor', { attack: value })}
            unit={COMPRESSOR_SCHEMA.attack.unit}
            min={COMPRESSOR_SCHEMA.attack.min}
            max={COMPRESSOR_SCHEMA.attack.max}
            step={COMPRESSOR_SCHEMA.attack.step}
            format={format}
            parse={parse}
            decimals={COMPRESSOR_SCHEMA.attack.decimals}
        />
    );
};
