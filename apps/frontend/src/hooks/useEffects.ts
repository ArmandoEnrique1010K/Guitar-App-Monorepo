import { useAppStore } from '@/store/useAppStore';

export const useEffects = () => {
    const effectsOrder = useAppStore((state) => state.effectsOrder);
    const effects = useAppStore((state) => state.effects);
    const effectsChain = useAppStore((state) => state.effectsChain);
    const effectHandlers = useAppStore((state) => state.effectHandlers);
    const currentEffectSelected = useAppStore(
        (state) => state.currentEffectSelected,
    );

    const setEffectsOrder = useAppStore((state) => state.setEffectsOrder);
    const updateEffect = useAppStore((state) => state.updateEffect);
    const toggleEffect = useAppStore((state) => state.toggleEffect);
    const moveEffect = useAppStore((state) => state.moveEffect);
    const createEffectInstance = useAppStore(
        (state) => state.createEffectInstance,
    );
    const removeEffectInstance = useAppStore(
        (state) => state.removeEffectInstance,
    );
    const rebuildEffectsChain = useAppStore(
        (state) => state.rebuildEffectsChain,
    );
    const addEffect = useAppStore((state) => state.addEffect);
    const setCurrentEffectSelected = useAppStore(
        (state) => state.setCurrentEffectSelected,
    );

    return {
        effectsOrder,
        effects,
        effectsChain,
        effectHandlers,
        currentEffectSelected,
        setEffectsOrder,
        updateEffect,
        toggleEffect,
        moveEffect,
        createEffectInstance,
        removeEffectInstance,
        rebuildEffectsChain,
        addEffect,
        setCurrentEffectSelected,
    };
};
