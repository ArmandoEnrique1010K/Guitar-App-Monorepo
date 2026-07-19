import {
    AssistantDesktopButton,
    AssistantMobileButton,
    EffectsButton,
    PreferencesButton,
    RigsButton,
} from '@/components';

export const BottomBarView = () => {
    return (
        <div className="flex flex-row p-2 bg-linear-to-r from-slate-700 to-slate-800 justify-between">
            <div className="flex flex-row gap-4">
                <PreferencesButton />
                <EffectsButton />
                <RigsButton />

                {/* xl: 1280px */}
                {/* Visible solo en pantallas menores a xl */}
                <div className="xl:hidden">
                    <AssistantMobileButton />
                </div>
            </div>
            {/* Visible solo en pantallas xl o mayores */}
            <div className="hidden xl:block">
                <AssistantDesktopButton />
            </div>
        </div>
    );
};
