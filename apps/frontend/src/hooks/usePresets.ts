import { useAppStore } from '@/store';

export const usePresets = () => {
    const presets = useAppStore((state) => state.presets);
    const loadPresets = useAppStore((state) => state.loadPresets);
    const savePreset = useAppStore((state) => state.savePreset);
    const createPresetModal = useAppStore((state) => state.createPresetModal);
    const openCreatePresetModal = useAppStore(
        (state) => state.openCreatePresetModal,
    );
    const closeCreatePresetModal = useAppStore(
        (state) => state.closeCreatePresetModal,
    );
    const currentPresetSelected = useAppStore(
        (state) => state.currentPresetSelected,
    );
    const setCurrentSelectedPreset = useAppStore(
        (state) => state.setCurrentSelectedPreset,
    );
    const applyPresetSelected = useAppStore(
        (state) => state.applyPresetSelected,
    );

    return {
        presets,
        loadPresets,
        savePreset,
        createPresetModal,
        openCreatePresetModal,
        closeCreatePresetModal,
        currentPresetSelected,
        setCurrentSelectedPreset,
        applyPresetSelected,
    };
};
