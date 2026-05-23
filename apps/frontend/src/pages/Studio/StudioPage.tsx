import { GuitarPanel } from '@/views/Studio/Fretboard/GuitarPanel';
import { SettingsPanel } from '@/views/Studio/Settings/SettingsPanel';

export const StudioPage = () => {
    return (
        <>
            <div className="flex flex-col h-full">
                <div className="w-full flex-1 bg-amber-400">
                    <GuitarPanel />
                </div>
                <SettingsPanel />
            </div>
        </>
    );
};
