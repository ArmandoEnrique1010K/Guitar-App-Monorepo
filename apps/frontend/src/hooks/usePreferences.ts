import { getAllGuitars } from '@/api/GuitarAPI';
import { useAppStore } from '@/store/useAppStore';
import { useEffect } from 'react';

export const usePreferences = () => {
    // Obten la guitarra seleccionada
    const guitarsList = useAppStore((state) => state.guitarsList);
    const selectedGuitar = useAppStore((state) => state.selectedGuitar);
    const changeSelectedGuitar = useAppStore(
        (state) => state.changeSelectedGuitar,
    );
    const setGuitarsList = useAppStore((state) => state.setGuitarsList);
    const stringOrder = useAppStore((state) => state.stringOrder);
    const changeStringOrder = useAppStore((state) => state.changeStringOrder);

    const holdToPlay = useAppStore((state) => state.holdToPlay);
    const toogleHoldToPlay = useAppStore((state) => state.toogleHoldToPlay);

    const muteOnSameString = useAppStore((state) => state.muteOnSameString);
    const toogleMuteOnSameString = useAppStore(
        (state) => state.toogleMuteOnSameString,
    );

    const muteOnDifferentString = useAppStore(
        (state) => state.muteOnDifferentString,
    );
    const toogleMuteOnDifferentString = useAppStore(
        (state) => state.toogleMuteOnDifferentString,
    );

    const loopMode = useAppStore((state) => state.loopMode);
    const toogleLoopMode = useAppStore((state) => state.toogleLoopMode);

    const loopIntervalMs = useAppStore((state) => state.loopIntervalMs);
    const changeLoopIntervalMs = useAppStore(
        (state) => state.changeLoopIntervalMs,
    );

    const autoMute = useAppStore((state) => state.autoMute);
    const toogleAutoMute = useAppStore((state) => state.toogleAutoMute);

    const autoMuteDelayMs = useAppStore((state) => state.autoMuteDelayMs);
    const changeAutoMuteDelayMs = useAppStore(
        (state) => state.changeAutoMuteDelayMs,
    );

    const showKeyboardKeys = useAppStore((state) => state.showKeyboardKeys);
    const toogleShowKeyboardKeys = useAppStore(
        (state) => state.toogleShowKeyboardKeys,
    );

    // Cuando se monta por primera vez
    useEffect(() => {
        // Llamar a la API
        // TODO: ¿SERA POSIBLE HACER EL LLAMADO DESDE EL SLIDE DE ZUSTAND?
        getAllGuitars().then((data) => {
            setGuitarsList(data);
            changeSelectedGuitar(data[0]);
        });
    }, [changeSelectedGuitar, setGuitarsList]);

    return {
        guitarsList,
        selectedGuitar,
        changeSelectedGuitar,
        stringOrder,
        changeStringOrder,
        holdToPlay,
        toogleHoldToPlay,
        muteOnSameString,
        toogleMuteOnSameString,
        muteOnDifferentString,
        toogleMuteOnDifferentString,
        loopMode,
        toogleLoopMode,
        loopIntervalMs,
        changeLoopIntervalMs,
        autoMute,
        toogleAutoMute,
        autoMuteDelayMs,
        changeAutoMuteDelayMs,
        showKeyboardKeys,
        toogleShowKeyboardKeys,
    };
};
