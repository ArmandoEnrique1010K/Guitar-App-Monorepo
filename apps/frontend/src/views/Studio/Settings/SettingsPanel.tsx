import { ControlBar } from './ControlBar';
import { PreferencesPanel } from './PreferencesPanel';
import { BottomBar } from './BottomBar';

export const SettingsPanel = () => {
    return (
        <div className="bg-linear-to-r from-slate-700 to-slate-800 ">
            <ControlBar />
            <PreferencesPanel />
            <BottomBar />
        </div>
    );
};
