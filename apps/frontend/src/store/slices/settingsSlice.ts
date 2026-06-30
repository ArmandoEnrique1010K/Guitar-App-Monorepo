import type { StateCreator } from 'zustand';
import {
    createWorkspace,
    deleteWorkspace,
    getAllWorkspaces,
    updateWorkspace,
    type Workspace,
} from '../../api/WorkspaceAPI';

export type SettingsSliceType = {
    message: string;
    playSoundOnPulseKeyboard: boolean; // Tocar sonido cuando pulsa una tecla
    addWorkspaceModal: boolean;
    setAddWorkspaceModal: (show: boolean) => void;

    workspaces: Workspace[];
    loadWorkspaces: () => Promise<void>;
    addWorkspace: (name: string) => void;

    currentSelectedWorkspace: Omit<Workspace, 'presetCount'> | null;
    setCurrentSelectedWorkspace: (
        workspace: Omit<Workspace, 'presetCount'>,
    ) => void;

    // currentSelectedWorkspaceId: string;
    // setCurrentSelectedWorkspaceId: (id: string) => void;

    //
    editWorkspaceModal: boolean;
    editWorkspace: (id: string, name: string) => void;
    editingWorkspace: Omit<Workspace, 'presetCount'> | null;
    openEditWorkspaceModal: (workspace: Omit<Workspace, 'presetCount'>) => void;
    closeEditWorkspaceModal: () => void;
    // setEditWorkspaceModal: (show: boolean) => void;

    deleteOneWorkspace: (id: string) => void;

    //

    workspaceView: 'workspaces' | 'presets';
    setWorkspaceView: (view: 'workspaces' | 'presets') => void;

    loadPresetsByWorkspace: (workspaceId: string) => void;
};

export const settingsSlice: StateCreator<SettingsSliceType> = (set) => ({
    message: '',
    playSoundOnPulseKeyboard: true,
    addWorkspaceModal: false,
    setAddWorkspaceModal: (showWorkspaceModal) => {
        set({ addWorkspaceModal: showWorkspaceModal });
    },

    workspaces: [],

    loadWorkspaces: async () => {
        try {
            const data = await getAllWorkspaces();
            set({ workspaces: data });
        } catch (error) {
            console.error(error);
        }
    },

    addWorkspace: async (name: string) => {
        const workspace = await createWorkspace({
            name,
        });

        set((state) => ({
            workspaces: [...state.workspaces, workspace],
        }));
    },

    // Nota: no puede ser null
    currentSelectedWorkspace: {
        _id: '',
        name: '',
    },

    setCurrentSelectedWorkspace: (workspace) => {
        set({
            currentSelectedWorkspace: workspace,
        });
    },

    // currentSelectedWorkspaceId: '',
    // setCurrentSelectedWorkspaceId: (id) => {
    //     set({
    //         currentSelectedWorkspaceId: id,
    //     });
    // },

    editWorkspaceModal: false,
    editWorkspace: async (id: string, name: string) => {
        const workspace = await updateWorkspace(id, {
            name,
        });

        set((state) => ({
            workspaces: state.workspaces.map((w) =>
                w._id === id
                    ? // NOTA: No se debe alterar el presetCount (conteo de configuraciones)
                      { ...w, name: workspace.name, presetCount: w.presetCount }
                    : w,
            ),
        }));
    },
    editingWorkspace: null,

    //     setEditWorkspaceModal: (show) => {
    //     set({ editWorkspaceModal: show });
    // },
    openEditWorkspaceModal: (workspace) =>
        set({
            editWorkspaceModal: true,
            editingWorkspace: workspace,
        }),

    closeEditWorkspaceModal: () =>
        set({
            editWorkspaceModal: false,
            editingWorkspace: null,
        }),

    deleteOneWorkspace: async (id: string) => {
        await deleteWorkspace(id);
        set((state) => ({
            workspaces: state.workspaces.filter((w) => w._id !== id),
        }));
    },

    workspaceView: 'workspaces',
    setWorkspaceView: (view) => {
        set({
            workspaceView: view,
        });
    },

    loadPresetsByWorkspace: async () => {
        // const presets = await getPresetsByWorkspace();
        // console.log(presets);
    },
});
