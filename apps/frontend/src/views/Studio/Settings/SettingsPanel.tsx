import { ControlBar } from '../ControlBar/ControlBar';
import { EffectsPanel } from './EffectsPanel';
import { PreferencesPanel } from './PreferencesPanel';
import { useBottomBar } from '@/hooks/useBottomBar';

export const SettingsPanel = () => {
    const { selectedPanel } = useBottomBar();

    return (
        <div className="bg-linear-to-r from-slate-700 to-slate-800 sm:px-2 sm:pt-2 px-1 pt-1 gap-2 flex flex-col">
            <ControlBar />

            {/* La altura debe ser estatica, no debe cambiar */}
            <div className="h-46 overflow-y-auto">
                {selectedPanel === 'preferences' && <PreferencesPanel />}
                {selectedPanel === 'effects' && <EffectsPanel />}
            </div>
        </div>
    );
};
