import { useMediaQuery } from 'react-responsive';
import {
    AssistantDesktopButton,
    AssistantMobileButton,
    EffectsButton,
    PreferencesButton,
    RigsButton,
} from '@/components';

export const BottomBarView = () => {
    const isDesktop = useMediaQuery({ minWidth: 1280 });

    return (
        <div className="flex flex-row p-2 bg-linear-to-r from-slate-700 to-slate-800 justify-between">
            <div className="flex flex-row gap-4">
                <PreferencesButton />
                <EffectsButton />
                <RigsButton />

                {/* TODO: EXPLICAR PORQUE NO FUNCIONA LA SELECCION AUTOMATICA */}
                {/* Cuando se pasaba de una pantalla movil a una de escritorio, el boton de PreferencesButton no se
                seleccionaba automaticamente */}
                {/* xl: 1280px */}
                {/* Visible solo en pantallas menores a xl */}
                {/* <div className="xl:hidden">
                    <AssistantMobileButton />
                </div> */}
                {!isDesktop && <AssistantMobileButton />}
            </div>
            {/* Visible solo en pantallas xl o mayores */}
            {/* <div className="hidden xl:block">
                <AssistantDesktopButton />
            </div> */}

            {isDesktop && <AssistantDesktopButton />}
        </div>
    );
};
