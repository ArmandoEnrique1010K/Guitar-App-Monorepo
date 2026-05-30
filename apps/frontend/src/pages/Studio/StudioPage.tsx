import { useAssistant } from '@/hooks/useAssistant';
import { useBottomBar } from '@/hooks/useBottomBar';
import { useFretboard } from '@/hooks/useFretboard';
import { usePreferences } from '@/hooks/usePreferences';
import { AssistantSlidingSidebar } from '@/views/Studio/Assistant/AssistantSlidingSidebar';
import { BottomBar } from '@/views/Studio/BottomBar/BottomBar';
import { GuitarPanel } from '@/views/Studio/Fretboard/GuitarPanel';
import { SettingsPanel } from '@/views/Studio/Settings/SettingsPanel';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

export const StudioPage = () => {
    const { isPanelOpen } = useAssistant();
    const { selectedPanel } = useBottomBar();
    const { loadGuitars, selectedGuitar } = usePreferences();
    const { loadNoteSamples } = useFretboard();
    const isDesktop = useMediaQuery({ minWidth: 1024 });

    // AQUI DEBE CARGARSE LOS EFECTOS SECUNDARIOS PORQUE ES EL COMPONENTE CONTENEDOR
    useEffect(() => {
        loadGuitars();
    }, [loadGuitars]);

    useEffect(() => {
        if (!selectedGuitar?._id) return;

        console.log('Loading note samples for guitar:', selectedGuitar._id);

        loadNoteSamples(selectedGuitar._id);
    }, [selectedGuitar?._id, loadNoteSamples]);

    return (
        <>
            <div className="flex flex-row w-full h-full overflow-hidden min-h-0">
                <div className="flex flex-col w-full min-h-0">
                    <div className="flex flex-col flex-1 min-w-0 min-h-0">
                        {/* En pantallas menores que el corte de tailwind 'lg' el panel del asistente de IA debe cubrir toda la pantalla */}
                        {!isDesktop && selectedPanel === 'assistant' ? (
                            <div className="w-full h-full">
                                <AssistantSlidingSidebar />
                            </div>
                        ) : (
                            <>
                                <div className="flex-1 overflow-auto">
                                    <GuitarPanel />
                                </div>
                                <SettingsPanel />
                            </>
                        )}
                    </div>

                    <BottomBar />
                </div>

                {isDesktop && isPanelOpen && <AssistantSlidingSidebar />}
            </div>
        </>
    );
};
// <div className="hidden lg:block">
//     {isPanelOpen && <AssistantSlidingSidebar />}
// </div>
