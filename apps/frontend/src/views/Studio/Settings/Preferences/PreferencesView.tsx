import {
    AllowDifferentStringOverlapButton,
    AllowSameStringOverlapButton,
    AutoMuteButton,
    AutoMuteSlider,
    EffectControlsContainer,
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
    // TODO PENDIENTE: OCULTAR LAS TECLAS EN PANTALLAS MENORES QUE 640PX sm:flex hidden
    return (
        <>
            <div className="flex flex-row justify-between sm:gap-4 gap-2 ">
                <div className="sm:flex hidden">
                    <SortableStringsList />
                </div>

                <div className="flex flex-col flex-1">
                    <div className="flex flex-col gap-2 items-start">
                        <div className="flex flex-row gap-2">
                            <HoldToPlayButton />
                            <AllowSameStringOverlapButton />
                            <AllowDifferentStringOverlapButton />
                            <div className="sm:flex hidden">
                                <ShowKeyboardButton />
                            </div>
                        </div>
                        <div className="w-full">
                            <EffectControlsContainer className="p-2">
                                <VolumeSlider />
                            </EffectControlsContainer>
                        </div>

                        <div className="flex flex-row gap-2 w-full">
                            <div className="flex flex-col gap-2">
                                <LoopModeButton />
                                <AutoMuteButton />
                            </div>
                            <EffectControlsContainer className="p-2">
                                <LoopModeSlider />
                                <div className="py-1.5"></div>
                                <AutoMuteSlider />
                            </EffectControlsContainer>
                        </div>
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
