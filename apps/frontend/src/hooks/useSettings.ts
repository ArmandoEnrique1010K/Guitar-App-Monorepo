import { useAppStore } from '@/store';

export const useSettings = () => {
    const addWorkspaceModal = useAppStore((state) => state.addWorkspaceModal);
    const setAddWorkspaceModal = useAppStore(
        (state) => state.setAddWorkspaceModal,
    );
    const workspaces = useAppStore((state) => state.workspaces);
    const loadWorkspaces = useAppStore((state) => state.loadWorkspaces);
    const addWorkspace = useAppStore((state) => state.addWorkspace);
    // const currentSelectedWorkspaceId = useAppStore(
    //     (state) => state.currentSelectedWorkspaceId,
    // );
    // const setCurrentSelectedWorkspaceId = useAppStore(
    //     (state) => state.setCurrentSelectedWorkspaceId,
    // );

    const currentSelectedWorkspace = useAppStore(
        (state) => state.currentSelectedWorkspace,
    );
    const setCurrentSelectedWorkspace = useAppStore(
        (state) => state.setCurrentSelectedWorkspace,
    );

    const editWorkspaceModal = useAppStore((state) => state.editWorkspaceModal);
    const editWorkspace = useAppStore((state) => state.editWorkspace);
    const editingWorkspace = useAppStore((state) => state.editingWorkspace);
    const openEditWorkspaceModal = useAppStore(
        (state) => state.openEditWorkspaceModal,
    );
    const closeEditWorkspaceModal = useAppStore(
        (state) => state.closeEditWorkspaceModal,
    );
    const deleteOneWorkspace = useAppStore((state) => state.deleteOneWorkspace);

    const workspaceView = useAppStore((state) => state.workspaceView);
    const setWorkspaceView = useAppStore((state) => state.setWorkspaceView);

    return {
        addWorkspaceModal,
        setAddWorkspaceModal,
        workspaces,
        loadWorkspaces,
        addWorkspace,
        // currentSelectedWorkspaceId,
        // setCurrentSelectedWorkspaceId,
        currentSelectedWorkspace,
        setCurrentSelectedWorkspace,

        editWorkspaceModal,
        editWorkspace,
        editingWorkspace,
        openEditWorkspaceModal,
        closeEditWorkspaceModal,
        deleteOneWorkspace,
        workspaceView,
        setWorkspaceView,
    };
};
