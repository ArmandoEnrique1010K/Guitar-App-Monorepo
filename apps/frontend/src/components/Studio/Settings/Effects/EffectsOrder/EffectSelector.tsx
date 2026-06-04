import { useEffects } from '@/hooks/useEffects';
import type { Effects } from '@/schemas';
import { SelectOptionEffectButton } from '@/ui/Studio/SelectOptionEffectButton';
const EFFECTS_INFO = [
    { id: 'distortion', label: 'Distorsión' },
    { id: 'reverb', label: 'Reverberación' },
    { id: 'vibrato', label: 'Vibrato' },
    { id: 'eq3', label: 'Ecualizador 3 bandas' },
];

export const EffectSelector = () => {
    const { addEffect, effectsOrder } = useEffects();
    const availableEffects = EFFECTS_INFO.filter(
        (effect) => !effectsOrder.includes(effect.id as keyof Effects),
    );
    return (
        <>
            <SelectOptionEffectButton
                options={availableEffects.map((effect) => ({
                    value: effect.id,
                    label: effect.label,
                }))}
                // onChange={(value) => {
                //     const effect = EFFECTS_INFO.find(
                //         (effect) => effect.label === value,
                //     );

                //     if (!effect) {
                //         console.log('No encontrado');
                //         return;
                //     }

                //     console.log('ID:', effect.id);
                //     console.log('LABEL:', effect.label);
                // }}
                onChange={(effectId) => {
                    console.log(effectId);

                    addEffect(effectId as keyof Effects);
                }}
            />
        </>
    );
};
