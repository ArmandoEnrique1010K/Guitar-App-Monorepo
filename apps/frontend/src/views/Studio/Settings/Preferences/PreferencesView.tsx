import {
    AllowDifferentStringOverlapButton,
    AllowSameStringOverlapButton,
    AutoMuteButton,
    AutoMuteSlider,
    GuitarButton,
    GuitarImage,
    HoldToPlayButton,
    LoopModeButton,
    LoopModeSlider,
    ShowKeyboardButton,
    SortableStringsList,
    VolumeSlider,
} from '@/components';

export const PreferencesView = () => {
    // TODO: SOLUCION TEMPORAL: OCULTAR LAS TECLAS EN PANTALLAS MENORES QUE 640PX sm:flex hidden
    return (
        <>
            <div className="flex flex-row justify-between sm:gap-4 gap-2 ">
                <div className="sm:flex hidden">
                    <SortableStringsList />
                </div>

                <div className="flex flex-col gap-4 flex-1">
                    <div className="flex xl:flex-row flex-col gap-4 xl:items-center items-start">
                        <div className="flex flex-row gap-2">
                            <HoldToPlayButton />
                            <AllowSameStringOverlapButton />
                            <AllowDifferentStringOverlapButton />
                            <div className="sm:flex hidden">
                                <ShowKeyboardButton />
                            </div>
                        </div>
                        <div className="w-full">
                            <VolumeSlider />
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 w-full">
                        <LoopModeButton />
                        <LoopModeSlider />
                    </div>
                    <div className="flex flex-row gap-2 w-full">
                        <AutoMuteButton />
                        <AutoMuteSlider />
                    </div>
                </div>
                <div className="flex flex-col w-44 gap-2">
                    <GuitarButton />
                    <GuitarImage />
                </div>
            </div>
        </>
    );
};
