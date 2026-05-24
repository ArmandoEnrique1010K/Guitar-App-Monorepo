import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { AssistantSliceType } from './assistantSlice';
import { assistantSlice } from './assistantSlice';
import type { FretboardSliceType } from './fretboardSlice';
import { fretboardSlice } from './fretboardSlice';
import {
    preferencesSlice,
    type PreferencesSliceType,
} from './preferencesSlice';
import { settingsSlice, type SettingsSliceType } from './settingsSlice';
import type { ControlBarSliceType } from './controlBarSlice';
import { controlBarSlice } from './controlBarSlice';

export const useAppStore = create<
    AssistantSliceType &
        FretboardSliceType &
        PreferencesSliceType &
        SettingsSliceType &
        ControlBarSliceType
>()(
    devtools((...a) => ({
        ...assistantSlice(...a),
        ...fretboardSlice(...a),
        ...preferencesSlice(...a),
        ...settingsSlice(...a),
        ...controlBarSlice(...a),
    })),
);
