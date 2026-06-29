import type { StateCreator } from 'zustand';
import {
    createWorkspace,
    getAllWorkspaces,
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
    currentSelectedWorkspaceId: string;
    setCurrentSelectedWorkspaceId: (id: string) => void;
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
            console.log(data);
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

    currentSelectedWorkspaceId: '',
    setCurrentSelectedWorkspaceId: (id) => {
        set({
            currentSelectedWorkspaceId: id,
        });
    },
});
