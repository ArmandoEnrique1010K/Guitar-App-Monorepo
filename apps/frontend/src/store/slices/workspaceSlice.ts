import type { StateCreator } from 'zustand';
import { isErrorResponse, isErrorResponseWithFields } from '@/utils';
import {
    createWorkspace,
    deleteWorkspace,
    getAllWorkspaces,
    updateWorkspace,
} from '@/api';
import type { Workspace } from '@/types';

export type WorkspaceSliceType = {
    addWorkspaceModal: boolean;
    setAddWorkspaceModal: (show: boolean) => void;

    workspaces: Workspace[];
    loadWorkspaces: () => Promise<void>;
    addWorkspace: (name: string) => void;

    currentSelectedWorkspace: Omit<Workspace, 'presetCount'> | null;
    setCurrentSelectedWorkspace: (
        workspace: Omit<Workspace, 'presetCount'>,
    ) => void;
    editWorkspaceModal: boolean;
    editWorkspace: (id: string, name: string) => void;
    editingWorkspace: Omit<Workspace, 'presetCount'> | null;
    openEditWorkspaceModal: (workspace: Omit<Workspace, 'presetCount'>) => void;
    closeEditWorkspaceModal: () => void;
    deleteOneWorkspace: (id: string) => void;
    workspaceView: 'workspaces' | 'presets';
    setWorkspaceView: (view: 'workspaces' | 'presets') => void;
};

export const workspaceSlice: StateCreator<WorkspaceSliceType> = (set, get) => ({
    addWorkspaceModal: false,
    setAddWorkspaceModal: (showWorkspaceModal) => {
        set({ addWorkspaceModal: showWorkspaceModal });
    },

    workspaces: [],

    loadWorkspaces: async () => {
        try {
            const data = await getAllWorkspaces();

            if (isErrorResponse(data)) {
                set({ workspaces: [] });
                return;
            }
            set({ workspaces: data });
        } catch (error) {
            console.error(error);
        }
    },

    addWorkspace: async (name: string) => {
        const workspace = await createWorkspace({
            name,
        });

        if (isErrorResponse(workspace)) {
            return;
        }

        if (isErrorResponseWithFields(workspace)) {
            return;
        }

        set((state) => ({
            workspaces: [...state.workspaces, workspace],
        }));

        // set({
        //     workspaces: [...get().workspaces, workspace]
        // })
    },

    // Nota: no puede ser null
    currentSelectedWorkspace: {
        _id: '',
        name: '',
    },

    setCurrentSelectedWorkspace: (workspace) => {
        // Obtener todas las configuraciones asociadasa a ese workspace

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

        if (isErrorResponse(workspace)) {
            return;
        }

        if (isErrorResponseWithFields(workspace)) {
            return;
        }

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
});
