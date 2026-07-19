import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
    assistantSlice,
    bottomBarSlice,
    controlBarSlice,
    effectsSlice,
    fretboardSlice,
    preferencesSlice,
    settingsSlice,
    profileSlice,
    presetsSlice,
    type AssistantSliceType,
    type BottomBarSliceType,
    type ControlBarSliceType,
    type EffectsSliceType,
    type FretboardSliceType,
    type PreferencesSliceType,
    type SettingsSliceType,
    type ProfileSliceType,
    type PresetsSliceType,
    type CreditsSliceType,
    creditsSlice,
} from './slices';

export const useAppStore = create<
    AssistantSliceType &
        FretboardSliceType &
        PreferencesSliceType &
        SettingsSliceType &
        ControlBarSliceType &
        BottomBarSliceType &
        EffectsSliceType &
        ProfileSliceType &
        SettingsSliceType &
        PresetsSliceType &
        CreditsSliceType
>()(
    devtools((...a) => ({
        ...assistantSlice(...a),
        ...fretboardSlice(...a),
        ...preferencesSlice(...a),
        ...settingsSlice(...a),
        ...controlBarSlice(...a),
        ...bottomBarSlice(...a),
        ...effectsSlice(...a),
        ...profileSlice(...a),
        ...settingsSlice(...a),
        ...presetsSlice(...a),
        ...creditsSlice(...a),
    })),
);
