import { useEffects } from '@/hooks/useEffects';
import type { Effects } from '@/schemas';
import { SelectOptionButton } from '@/ui/Studio/SelectOptionButton';
const EFFECTS_INFO = [
    {
        id: 'distortion',
        label: 'Distorsión',
    },
    {
        id: 'reverb',
        label: 'Reverberación',
    },
    {
        id: 'vibrato',
        label: 'Vibrato',
    },
    {
        id: 'eq3',
        label: 'Ecualizador 3 bandas',
    },
];
export const EffectSelector = () => {
    const { addEffect } = useEffects();

    return (
        <>
            <SelectOptionButton
                value="Agregue un efecto"
                options={EFFECTS_INFO.map((effect) => effect.label)}
                onChange={(value) => {
                    console.log('SELECT:', value);

                    const effect = EFFECTS_INFO.find(
                        (effect) => effect.label === value,
                    );

                    console.log(effect);

                    if (!effect) return;

                    addEffect(effect.id as keyof Effects);
                }}
            />
        </>
    );
};
