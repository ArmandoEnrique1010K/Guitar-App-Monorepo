import { useAssistant } from '@/hooks/useAssistant';
import { AssistantSlidingSidebar } from '@/views/Studio/Assistant/AssistantSlidingSidebar';
import { GuitarPanel } from '@/views/Studio/Fretboard/GuitarPanel';
import { SettingsPanel } from '@/views/Studio/Settings/SettingsPanel';

export const StudioPage = () => {
    const { showPanel } = useAssistant();

    return (
        <>
            <div className="flex w-full h-full overflow-hidden">
                <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex-1 overflow-auto">
                        <GuitarPanel />
                    </div>
                    <SettingsPanel />
                </div>
                <div className="hidden sm:block">
                    {showPanel && <AssistantSlidingSidebar />}
                </div>
            </div>
        </>
    );
};
