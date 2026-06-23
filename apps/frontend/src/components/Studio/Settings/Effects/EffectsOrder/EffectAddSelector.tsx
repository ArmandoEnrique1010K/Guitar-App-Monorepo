import { useEffects } from '@/hooks/useEffects';
import type { Effects } from '@/schemas';
import { SelectOptionEffectButton } from '@/ui/Studio/SelectOptionEffectButton';
import { EFFECTS_NAMES } from '@/translate/EffectsNames';

export const EffectAddSelector = () => {
    const { addEffect, effectsOrder } = useEffects();

    // EFFECTS_NAMES CONTIENE LOS NOMBRES DE LOS EFECTOS DE SONIDO EN ESPAÑOL
    const availableEffects = Object.entries(EFFECTS_NAMES).filter(
        ([key]) => !effectsOrder.includes(key as keyof Effects),
    );

    return (
        <>
            <SelectOptionEffectButton
                options={availableEffects.map(([key, value]) => ({
                    value: key,
                    label: value,
                }))}
                onChange={(effectId) => {
                    console.log(effectId);

                    addEffect(effectId as keyof Effects);
                }}
            />
        </>
    );
};
