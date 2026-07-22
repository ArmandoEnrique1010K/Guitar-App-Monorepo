import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// No utilizar @/store para importar
import {
    assistantSlice,
    effectsSlice,
    fretboardSlice,
    preferencesSlice,
    settingsSlice,
    profileSlice,
    presetsSlice,
    creditsSlice,
    workspaceSlice,
    type AssistantSliceType,
    type EffectsSliceType,
    type FretboardSliceType,
    type PreferencesSliceType,
    type SettingsSliceType,
    type ProfileSliceType,
    type PresetsSliceType,
    type CreditsSliceType,
    type WorkspaceSliceType,
} from './slices';

export const useAppStore = create<
    AssistantSliceType &
        FretboardSliceType &
        PreferencesSliceType &
        SettingsSliceType &
        EffectsSliceType &
        ProfileSliceType &
        SettingsSliceType &
        PresetsSliceType &
        CreditsSliceType &
        WorkspaceSliceType
>()(
    devtools((...a) => ({
        ...assistantSlice(...a),
        ...fretboardSlice(...a),
        ...preferencesSlice(...a),
        ...settingsSlice(...a),
        ...effectsSlice(...a),
        ...profileSlice(...a),
        ...settingsSlice(...a),
        ...presetsSlice(...a),
        ...creditsSlice(...a),
        ...workspaceSlice(...a),
    })),
);
