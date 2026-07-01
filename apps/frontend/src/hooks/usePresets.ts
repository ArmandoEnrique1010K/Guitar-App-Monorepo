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
    const editPresetModal = useAppStore((state) => state.editPresetModal);
    const openEditPresetModal = useAppStore(
        (state) => state.openEditPresetModal,
    );
    const closeEditPresetModal = useAppStore(
        (state) => state.closeEditPresetModal,
    );
    const editingPreset = useAppStore((state) => state.editingPreset);
    const editPreset = useAppStore((state) => state.editPreset);
    const deleteOnePreset = useAppStore((state) => state.deleteOnePreset);
    const clearPresets = useAppStore((state) => state.clearPresets);

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
        editPresetModal,
        openEditPresetModal,
        closeEditPresetModal,
        editingPreset,
        editPreset,
        deleteOnePreset,
        clearPresets,
    };
};
