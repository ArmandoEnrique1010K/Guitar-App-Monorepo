import { FREEVERB_SCHEMA } from '@/constants/effects/freeverb.constants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    FREEVERB_SCHEMA.roomSize.factor,
    FREEVERB_SCHEMA.roomSize.decimals,
);

export const RoomSizeSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Tamaño del cuarto"
            value={effects.freeverb.roomSize}
            onChange={(value) => updateEffect('freeverb', { roomSize: value })}
            unit={FREEVERB_SCHEMA.roomSize.unit}
            min={FREEVERB_SCHEMA.roomSize.min}
            max={FREEVERB_SCHEMA.roomSize.max}
            step={FREEVERB_SCHEMA.roomSize.step}
            format={format}
            parse={parse}
            decimals={FREEVERB_SCHEMA.roomSize.decimals}
        />
    );
};
