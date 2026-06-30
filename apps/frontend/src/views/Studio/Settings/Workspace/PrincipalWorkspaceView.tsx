import { usePresets, useProfile, useSettings } from '@/hooks';
import { WorkspaceView } from './WorkspaceView';
import { PresetsView } from './PresetsView';
import { useEffect } from 'react';

export const PrincipalWorkspaceView = () => {
    const { workspaceView, loadWorkspaces, currentSelectedWorkspace } =
        useSettings();
    const { profile } = useProfile();
    const { loadPresets } = usePresets();

    useEffect(() => {
        if (profile) loadWorkspaces();
    }, []);

    useEffect(() => {
        if (currentSelectedWorkspace) loadPresets();
    }, [currentSelectedWorkspace]);

    if (workspaceView === 'workspaces') {
        return <WorkspaceView />;
    }

    return <PresetsView />;
};
