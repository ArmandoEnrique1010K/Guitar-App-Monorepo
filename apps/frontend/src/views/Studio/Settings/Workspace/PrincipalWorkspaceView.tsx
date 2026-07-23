import { useEffect } from 'react';
import { usePresets, useProfile, useWorkspace } from '@/hooks';
import { WorkspaceView, PresetsView } from '@/views';

export const PrincipalWorkspaceView = () => {
    const { workspaceView, loadWorkspaces, currentSelectedWorkspace } =
        useWorkspace();
    const { profile } = useProfile();
    const { loadPresets } = usePresets();

    useEffect(() => {
        if (profile) loadWorkspaces();
    }, []);

    useEffect(() => {
        if (currentSelectedWorkspace._id !== '') {
            // console.log({ currentSelectedWorkspace });
            loadPresets();
        }
    }, [currentSelectedWorkspace]);

    if (workspaceView === 'workspaces') {
        return <WorkspaceView />;
    }

    return <PresetsView />;
};
