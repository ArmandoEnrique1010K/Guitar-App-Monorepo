import { useMediaQuery } from 'react-responsive';
import { useAssistant } from '@/hooks/useAssistant';
import { useBottomBar } from '@/hooks/useBottomBar';
import {
    AssistantView,
    BottomBarView,
    FretboardView,
    SettingsView,
} from '@/views';

export const StudioPage = () => {
    const { isPanelOpen } = useAssistant();
    const { selectedPanel } = useBottomBar();
    const isDesktop = useMediaQuery({ minWidth: 1024 });

    return (
        <>
            <div className="flex flex-row w-full h-full overflow-hidden min-h-0">
                <div className="flex flex-col w-full min-h-0">
                    <div className="flex flex-col flex-1 min-w-0 min-h-0">
                        {/* En pantallas menores que el corte de tailwind 'lg' el panel del asistente de IA debe cubrir toda la pantalla */}
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

                {isDesktop && isPanelOpen && <AssistantView />}
            </div>
        </>
    );
};
// <div className="hidden lg:block">
//     {isPanelOpen && <AssistantView />}
// </div>
