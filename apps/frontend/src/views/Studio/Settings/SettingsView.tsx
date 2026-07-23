import { useSettings } from '@/hooks';
import {
    ControlBarView,
    EffectsView,
    PrincipalWorkspaceView,
    PreferencesView,
} from '@/views';

export const SettingsView = () => {
    const { selectedPanel } = useSettings();

    return (
        <div className="bg-linear-to-r from-slate-700 to-slate-800 sm:px-2 sm:pt-2 px-1 pt-1 gap-2 flex flex-col">
            <ControlBarView />

            {/* La altura debe ser estatica, no debe cambiar */}
            <div className="h-46 overflow-hidden">
                {selectedPanel === 'preferences' && <PreferencesView />}
                {selectedPanel === 'effects' && <EffectsView />}
                {selectedPanel === 'workspaces' && <PrincipalWorkspaceView />}
            </div>
        </div>
    );
};
