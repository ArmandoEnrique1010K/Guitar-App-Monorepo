import { useAppStore } from '@/store';

export const useSettings = () => {
    const addWorkspaceModal = useAppStore((state) => state.addWorkspaceModal);
    const setAddWorkspaceModal = useAppStore(
        (state) => state.setAddWorkspaceModal,
    );
    const workspaces = useAppStore((state) => state.workspaces);
    const loadWorkspaces = useAppStore((state) => state.loadWorkspaces);
    const addWorkspace = useAppStore((state) => state.addWorkspace);
    const currentSelectedWorkspaceId = useAppStore(
        (state) => state.currentSelectedWorkspaceId,
    );
    const setCurrentSelectedWorkspaceId = useAppStore(
        (state) => state.setCurrentSelectedWorkspaceId,
    );

    return {
        addWorkspaceModal,
        setAddWorkspaceModal,
        workspaces,
        loadWorkspaces,
        addWorkspace,
        currentSelectedWorkspaceId,
        setCurrentSelectedWorkspaceId,
    };
};
