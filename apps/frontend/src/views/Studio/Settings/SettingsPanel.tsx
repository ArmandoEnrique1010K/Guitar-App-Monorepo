import { ControlBar } from '../ControlBar/ControlBar';
import { EffectsPanel } from './EffectsPanel';
import { PreferencesPanel } from './PreferencesPanel';
import { useBottomBar } from '@/hooks/useBottomBar';

export const SettingsPanel = () => {
    const { selectedPanel } = useBottomBar();

    return (
        <div className="bg-linear-to-r from-slate-700 to-slate-800 ">
            <ControlBar />
            <div className="h-52 overflow-y-auto">
                {selectedPanel === 'preferences' && <PreferencesPanel />}
                {selectedPanel === 'effects' && <EffectsPanel />}
            </div>
        </div>
    );
};
