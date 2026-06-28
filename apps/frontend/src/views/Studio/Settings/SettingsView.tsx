import { useBottomBar } from '@/hooks';
import { ControlBarView } from '../ControlBar/ControlBarView';
import { PreferencesView } from './Preferences/PreferencesView';
import { EffectsView } from './Effects/EffectsView';
import { WorkspaceView } from './Workspace/WorkspaceView';

export const SettingsView = () => {
    const { selectedPanel } = useBottomBar();

    return (
        <div className="bg-linear-to-r from-slate-700 to-slate-800 sm:px-2 sm:pt-2 px-1 pt-1 gap-2 flex flex-col">
            <ControlBarView />

            {/* La altura debe ser estatica, no debe cambiar */}
            <div className="h-46 overflow-y-auto">
                {selectedPanel === 'preferences' && <PreferencesView />}
                {selectedPanel === 'effects' && <EffectsView />}
                {selectedPanel === 'workspaces' && <WorkspaceView />}
            </div>
        </div>
    );
};
