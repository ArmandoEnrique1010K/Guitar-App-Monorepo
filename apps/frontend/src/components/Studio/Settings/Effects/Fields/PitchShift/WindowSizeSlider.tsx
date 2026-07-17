import { PITCHSHIFT_SCHEMA } from '@/constants/pitchShift.contants';
import { createEffectTransform } from '@/factories';
import { useEffects } from '@/hooks';
import { HorizontalSlider } from '@/ui';

const { format, parse } = createEffectTransform(
    PITCHSHIFT_SCHEMA.windowSize.factor,
    PITCHSHIFT_SCHEMA.windowSize.decimals,
);

export const WindowSizeSlider = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalSlider
            label="Tamaño de la ventana"
            value={effects.pitchShift.windowSize}
            onChange={(value) =>
                updateEffect('pitchShift', { windowSize: value })
            }
            unit={PITCHSHIFT_SCHEMA.windowSize.unit}
            min={PITCHSHIFT_SCHEMA.windowSize.min}
            max={PITCHSHIFT_SCHEMA.windowSize.max}
            step={PITCHSHIFT_SCHEMA.windowSize.step}
            format={format}
            parse={parse}
            decimals={PITCHSHIFT_SCHEMA.windowSize.decimals}
        />
    );
};
