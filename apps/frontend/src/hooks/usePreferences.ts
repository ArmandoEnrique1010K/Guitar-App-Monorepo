import { useAppStore } from '@/store/useAppStore';
import { useEffect } from 'react';

export const usePreferences = () => {
    // Obten la guitarra seleccionada
    const guitars = useAppStore((state) => state.guitars);
    const selectedGuitar = useAppStore((state) => state.selectedGuitar);
    const setSelectedGuitar = useAppStore((state) => state.setSelectedGuitar);
    const stringOrder = useAppStore((state) => state.stringOrder);
    const setStringOrder = useAppStore((state) => state.setStringOrder);

    const holdToPlay = useAppStore((state) => state.holdToPlay);
    const toggleHoldToPlay = useAppStore((state) => state.toggleHoldToPlay);

    const allowSameStringOverlap = useAppStore(
        (state) => state.allowSameStringOverlap,
    );
    const toggleAllowSameStringOverlap = useAppStore(
        (state) => state.toggleAllowSameStringOverlap,
    );

    const allowDifferentStringOverlap = useAppStore(
        (state) => state.allowDifferentStringOverlap,
    );
    const toggleAllowDifferentStringOverlap = useAppStore(
        (state) => state.toggleAllowDifferentStringOverlap,
    );

    const loopMode = useAppStore((state) => state.loopMode);
    const toggleLoopMode = useAppStore((state) => state.toggleLoopMode);

    const loopIntervalMs = useAppStore((state) => state.loopIntervalMs);
    const setLoopIntervalMs = useAppStore((state) => state.setLoopIntervalMs);

    const autoMute = useAppStore((state) => state.autoMute);
    const toggleAutoMute = useAppStore((state) => state.toggleAutoMute);

    const autoMuteDelayMs = useAppStore((state) => state.autoMuteDelayMs);
    const setAutoMuteDelayMs = useAppStore((state) => state.setAutoMuteDelayMs);

    const showKeyboardKeys = useAppStore((state) => state.showKeyboardKeys);
    const toggleShowKeyboardKeys = useAppStore(
        (state) => state.toggleShowKeyboardKeys,
    );
    const volume = useAppStore((state) => state.volume);
    const setVolume = useAppStore((state) => state.setVolume);
    const loadGuitars = useAppStore((state) => state.loadGuitars);

    useEffect(() => {
        loadGuitars();
    }, [loadGuitars]);
    // // Cuando se monta por primera vez
    // useEffect(() => {
    //     // Llamar a la API
    //     // TODO: ¿SERA POSIBLE HACER EL LLAMADO DESDE EL SLIDE DE ZUSTAND?
    //     getAllGuitars().then((data) => {
    //         setGuitars(data);
    //         setSelectedGuitar(data[0]);
    //     });
    // }, [setSelectedGuitar, setGuitars]);

    return {
        guitars,
        selectedGuitar,
        setSelectedGuitar,
        stringOrder,
        setStringOrder,
        holdToPlay,
        toggleHoldToPlay,
        allowSameStringOverlap,
        toggleAllowSameStringOverlap,
        allowDifferentStringOverlap,
        toggleAllowDifferentStringOverlap,
        loopMode,
        toggleLoopMode,
        loopIntervalMs,
        setLoopIntervalMs,
        autoMute,
        toggleAutoMute,
        autoMuteDelayMs,
        setAutoMuteDelayMs,
        showKeyboardKeys,
        toggleShowKeyboardKeys,
        volume,
        setVolume,
        loadGuitars,
    };
};
