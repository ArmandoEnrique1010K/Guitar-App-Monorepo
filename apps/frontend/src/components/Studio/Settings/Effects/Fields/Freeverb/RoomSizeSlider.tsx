import { FREEVERB_SCHEMA } from '@/constants/effects/freeverb.constants';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';
import { formatEffectValue } from '@/utils';

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
            formatedValue={formatEffectValue(
                effects.freeverb.roomSize,
                FREEVERB_SCHEMA.roomSize.factor,
                FREEVERB_SCHEMA.roomSize.decimals,
            )}
        />
    );
};
