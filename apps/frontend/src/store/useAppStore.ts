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
    type AssistantSliceType,
    type BottomBarSliceType,
    type ControlBarSliceType,
    type EffectsSliceType,
    type FretboardSliceType,
    type PreferencesSliceType,
    type SettingsSliceType,
} from './slices';

export const useAppStore = create<
    AssistantSliceType &
        FretboardSliceType &
        PreferencesSliceType &
        SettingsSliceType &
        ControlBarSliceType &
        BottomBarSliceType &
        EffectsSliceType
>()(
    devtools((...a) => ({
        ...assistantSlice(...a),
        ...fretboardSlice(...a),
        ...preferencesSlice(...a),
        ...settingsSlice(...a),
        ...controlBarSlice(...a),
        ...bottomBarSlice(...a),
        ...effectsSlice(...a),
    })),
);
