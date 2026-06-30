import { createPreset, getAllPresets, type Preset } from '@/api/PresetAPI';
import type { StateCreator } from 'zustand';
import type { SettingsSliceType } from './settingsSlice';
import type { PreferencesSliceType } from './preferencesSlice';
import type { ControlBarSliceType } from './controlBarSlice';
import type { EffectsSliceType } from './effectsSlice';
import { buildEffectsPayload } from '@/utils/buildEffectsPayload';
import type { BottomBarSliceType } from './bottomBarSlice';
import type { Effects } from '@/schemas';

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
};

export const presetsSlice: StateCreator<
    PresetsSliceType &
        SettingsSliceType &
        PreferencesSliceType &
        ControlBarSliceType &
        EffectsSliceType &
        BottomBarSliceType,
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
            set({ presets: data });
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
                presets: [...state.presets, preset],
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

        // LLAMAR A UN METODO PARA DESTRUIR TODOS LOS EFECTOS DE SONIDO ANTERIORES
        // get().resetEffectsChain();

        // // Ordenar efectos
        // const presetEffects = [...selectedPreset.effects].sort(
        //     (a, b) => a.order - b.order,
        // );

        // const effectsOrder = presetEffects.map(
        //     (effect) => effect.type,
        // ) as (keyof Effects)[];

        // // Construir el nuevo estado de effects
        // const updatedEffects = { ...get().effects };

        // for (const effect of presetEffects) {
        //     updatedEffects[effect.type] = {
        //         enabled: effect.enabled,
        //         ...effect.params,
        //     };
        // }

        // // Actualizar Zustand una sola vez
        // set({
        //     effects: updatedEffects,
        //     effectsOrder,
        //     currentEffectSelected: effectsOrder[0],
        // });

        // // Crear/configurar las instancias
        // for (const effect of presetEffects) {
        //     get().createEffectInstance(effect.type as keyof Effects);
        // }

        // // ESTE METODO NO HACE NADA
        // // Reconectar la cadena
        // // get().rebuildEffectsChain();
    },
});
