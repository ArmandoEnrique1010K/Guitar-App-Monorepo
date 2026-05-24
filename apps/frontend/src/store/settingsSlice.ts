import type { StateCreator } from 'zustand';

export type SettingsSliceType = {
    message: string;
    playSoundOnPulseKeyboard: boolean; // Tocar sonido cuando pulsa una tecla
};

export const settingsSlice: StateCreator<SettingsSliceType> = () => ({
    message: '',
    playSoundOnPulseKeyboard: true,
});
