import { useAppStore } from '@/store';

export const useEffects = () => {
    const effectsOrder = useAppStore((state) => state.effectsOrder);
    const effects = useAppStore((state) => state.effects);
    const effectsChain = useAppStore((state) => state.effectsChain);
    const currentEffectSelected = useAppStore(
        (state) => state.currentEffectSelected,
    );

    const updateEffect = useAppStore((state) => state.updateEffect);
    const toggleEffect = useAppStore((state) => state.toggleEffect);
    const moveEffect = useAppStore((state) => state.moveEffect);
    const createEffectInstance = useAppStore(
        (state) => state.createEffectInstance,
    );
    const removeEffectInstance = useAppStore(
        (state) => state.removeEffectInstance,
    );
    const addEffect = useAppStore((state) => state.addEffect);
    const setCurrentEffectSelected = useAppStore(
        (state) => state.setCurrentEffectSelected,
    );
    const resetDefaultValuesEffectInstance = useAppStore(
        (state) => state.resetDefaultValuesEffectInstance,
    );

    return {
        effectsOrder,
        effects,
        effectsChain,
        currentEffectSelected,
        updateEffect,
        toggleEffect,
        moveEffect,
        createEffectInstance,
        removeEffectInstance,
        addEffect,
        setCurrentEffectSelected,
        resetDefaultValuesEffectInstance,
    };
};
