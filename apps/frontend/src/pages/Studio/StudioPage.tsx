import { useMediaQuery } from 'react-responsive';
import { useAssistant, useBottomBar } from '@/hooks';
import {
    AssistantView,
    BottomBarView,
    FretboardView,
    SettingsView,
} from '@/views';

export const StudioPage = () => {
    const { isAssistantPanelOpen } = useAssistant();
    const { selectedPanel } = useBottomBar();

    // Con react-responsive puedes controlar el ancho de la pantalla
    const isDesktop = useMediaQuery({ minWidth: 1280 });

    return (
        <>
            <div className="flex flex-row w-full h-full overflow-hidden min-h-0">
                <div className="flex flex-col w-full min-h-0">
                    <div className="flex flex-col flex-1 min-w-0 min-h-0">
                        {!isDesktop && selectedPanel === 'assistant' ? (
                            <div className="w-full h-full">
                                <AssistantView />
                            </div>
                        ) : (
                            <>
                                <div className="flex-1 overflow-auto">
                                    <FretboardView />
                                </div>
                                <SettingsView />
                            </>
                        )}
                    </div>

                    <BottomBarView />
                </div>

                {isDesktop && isAssistantPanelOpen && <AssistantView />}
            </div>
        </>
    );
};
