import {
    createPreset,
    deletePreset,
    getAllPresets,
    updatePreset,
} from '@/api/PresetAPI';
import type { StateCreator } from 'zustand';
import type { SettingsSliceType } from './settingsSlice';
import type { PreferencesSliceType } from './preferencesSlice';
import type { ControlBarSliceType } from './controlBarSlice';
import type { EffectsSliceType } from './effectsSlice';
import {
    buildEffectsPayload,
    isErrorResponse,
    isErrorResponseWithFields,
} from '@/utils';
import type { BottomBarSliceType } from './bottomBarSlice';
import type { FretboardSliceType } from './fretboardSlice';
import type { Preset } from '@/types';

export type PresetsSliceType = {
    presets: Preset[];
    loadPresets: () => Promise<void>;
    savePreset: (workspaceId: string, name: string) => void;

    createPresetModal: boolean;
    openCreatePresetModal: () => void;
    closeCreatePresetModal: () => void;
    currentPresetSelected: { _id: string; name: string };
    setCurrentSelectedPreset: ({
        _id,
        name,
    }: {
        _id: string;
        name: string;
    }) => void;

    applyPresetSelected: (presetId: string) => void;

    editPresetModal: boolean;
    editingPreset: { _id: string; name: string } | null;
    openEditPresetModal: ({ _id, name }: { _id: string; name: string }) => void;
    closeEditPresetModal: () => void;

    editPreset: (id: string, name: string) => void;
    deleteOnePreset: (id: string) => void;
    clearPresets: () => void;
};

export const presetsSlice: StateCreator<
    PresetsSliceType &
        SettingsSliceType &
        PreferencesSliceType &
        ControlBarSliceType &
        EffectsSliceType &
        BottomBarSliceType &
        FretboardSliceType,
    [],
    [],
    PresetsSliceType
> = (set, get) => ({
    presets: [],
    loadPresets: async () => {
        try {
            const data = await getAllPresets(
                get().currentSelectedWorkspace._id,
            );

            if ('error' in data) {
                return;
            }

            set({ presets: data });

            // Obtiene todos los IDs de guitarra
            const guitarIds = get().presets.map((preset) => preset.guitar);
            const differentGuitarIds = [...new Set(guitarIds)];
            // Debe llamar a initializePlayers por cada ID de guitarra que encuentre en el workspace

            // console.log({ differentGuitarIds });

            for (const guitarId of differentGuitarIds) {
                get().initializePlayers(guitarId, get().noteSamples);
            }
        } catch (error) {
            console.error(error);
        }
    },

    savePreset: async (workspaceId, name) => {
        // AQUI SE TOMA CADA UNO DE LOS ESTADOS Y SE GUARDAN
        try {
            // const formattedEffects = get().effectsOrder.map((type, index) => {
            //     const effect = get().effects[type];

            //     const { enabled, ...params } = effect;

            //     return {
            //         type,
            //         order: index + 1,
            //         enabled,
            //         params,
            //     };
            // });
            const preset = await createPreset(
                workspaceId,
                get().selectedGuitar._id,
                {
                    // Nombre de la configuración
                    name: name,
                    volume: get().volume,
                    holdToPlay: get().holdToPlay,
                    allowSameStringOverlap: get().allowSameStringOverlap,
                    allowDifferentStringOverlap:
                        get().allowDifferentStringOverlap,
                    loopMode: get().loopMode,
                    loopIntervalMs: get().loopIntervalMs,
                    autoMute: get().autoMute,
                    autoMuteDelayMs: get().autoMuteDelayMs,
                    rootChord: get().rootChord,
                    lockOpenString: get().lockOpenString,
                    stringOrder: get().stringOrder,

                    // Aqui va el procedimiento de efectos de sonido
                    effects: buildEffectsPayload(
                        get().effects,
                        get().effectsOrder,
                    ),
                },
            );

            if ('error' in preset || 'errors' in preset) {
                return;
            }

            set((state) => ({
                workspaces: state.workspaces.map((workspace) =>
                    workspace._id === get().currentSelectedWorkspace?._id
                        ? {
                              ...workspace,
                              // Solamente aumenta la cantidad
                              presetCount: workspace.presetCount + 1,
                          }
                        : workspace,
                ),
                // presets: [...state.presets, preset],
                presets: [...state.presets, preset as Preset],
            }));
        } catch (error) {
            console.error(error);
        }
    },

    createPresetModal: false,
    openCreatePresetModal: () => {
        set({
            createPresetModal: true,
        });
    },
    closeCreatePresetModal: () => {
        set({ createPresetModal: false });
    },
    currentPresetSelected: { _id: '', name: '' },
    setCurrentSelectedPreset: ({ _id, name }) => {
        set({ currentPresetSelected: { _id, name } });
    },

    applyPresetSelected: (presetId) => {
        // TODO: CREAR UNA OPCION PARA LIMPIAR TODO CUANDO SE CAMBIA DE CONFIGURACIÓN
        // get().stopAllNotes();

        // Debe tomar la configuración desde el estado
        const selectedPreset = get().presets.find((p) => p._id === presetId);
        if (!selectedPreset) return;

        // Aplicar la configuración a todos los campos
        set({
            // Busca la guitarra por ID
            selectedGuitar: get().guitars.find(
                (guitar) => guitar._id === selectedPreset.guitar,
            ),
            volume: selectedPreset.volume,
            holdToPlay: selectedPreset.holdToPlay,
            allowSameStringOverlap: selectedPreset.allowDifferentStringOverlap,
            allowDifferentStringOverlap:
                selectedPreset.allowDifferentStringOverlap,
            loopMode: selectedPreset.loopMode,
            loopIntervalMs: selectedPreset.loopIntervalMs,
            autoMute: selectedPreset.autoMute,
            autoMuteDelayMs: selectedPreset.autoMuteDelayMs,
            rootChord: selectedPreset.rootChord,
            lockOpenString: selectedPreset.lockOpenString,
            stringOrder: selectedPreset.stringOrder,
        });

        // APLICAR EL PROCEDIMIENTO INVERSO
        get().loadEffectsFromPreset(selectedPreset.effects);

        // Imprime los efectos de sonido que se agregaron
        // console.log('EFFECT CHAIN: ', get().effectsChain);

        // NO OLVIDAR ESTO PARA CONTROLAR EL VOLUMEN
        // console.log(selectedPreset.volume);
        // console.log(get().volume);
        // get().setVolume(get().volume);
        get().setVolume(selectedPreset.volume);
    },

    editPresetModal: false,
    editingPreset: null,
    openEditPresetModal: ({ _id, name }) => {
        set({
            editPresetModal: true,
            editingPreset: { _id, name },
        });
    },
    closeEditPresetModal: () => {
        set({ editPresetModal: false, editingPreset: null });
    },

    editPreset: async (id, name) => {
        const preset = await updatePreset(id, get().selectedGuitar._id, {
            name: name,
            volume: get().volume,
            holdToPlay: get().holdToPlay,
            allowSameStringOverlap: get().allowSameStringOverlap,
            allowDifferentStringOverlap: get().allowDifferentStringOverlap,
            loopMode: get().loopMode,
            loopIntervalMs: get().loopIntervalMs,
            autoMute: get().autoMute,
            autoMuteDelayMs: get().autoMuteDelayMs,
            rootChord: get().rootChord,
            lockOpenString: get().lockOpenString,
            stringOrder: get().stringOrder,

            // Aqui va el procedimiento de efectos de sonido
            effects: buildEffectsPayload(get().effects, get().effectsOrder),
        });

        // TODO: INVESTIGAR
        if (isErrorResponseWithFields(preset)) {
            return;
        }

        // ACTUALIZAR EL ESTADO DE PRESET CON LA RESPUESTA DEVUELTA POR LA API
        set((state) => ({
            presets: state.presets.map((p) =>
                p._id === id
                    ? {
                          ...p,
                          name: preset.name,
                          volume: preset.volume,
                          holdToPlay: preset.holdToPlay,
                          allowSameStringOverlap: preset.allowSameStringOverlap,
                          allowDifferentStringOverlap:
                              preset.allowDifferentStringOverlap,
                          loopMode: preset.loopMode,
                          loopIntervalMs: preset.loopIntervalMs,
                          autoMute: preset.autoMute,
                          autoMuteDelayMs: preset.autoMuteDelayMs,
                          rootChord: preset.rootChord,
                          lockOpenString: preset.lockOpenString,
                          stringOrder: preset.stringOrder,

                          // TODO: CONFIGURAR LOS EFECTOS DE SONIDO
                          effects: preset.effects,

                          // Aqui va el procedimiento de efectos de sonido
                          //   effects: buildEffectsPayload(
                          //       preset.effects,
                          //       preset.effectsOrder,
                          //   ),
                      }
                    : p,
            ),
        }));
    },

    deleteOnePreset: async (id) => {
        await deletePreset(id);
        set((state) => ({
            presets: state.presets.filter((p) => p._id !== id),
            workspaces: state.workspaces.map((w) => ({
                ...w,
                presetCount:
                    w._id === get().currentSelectedWorkspace._id
                        ? (w.presetCount = w.presetCount - 1)
                        : w.presetCount,
            })),
        }));
    },

    clearPresets() {
        set({
            presets: [],
        });
    },
});
