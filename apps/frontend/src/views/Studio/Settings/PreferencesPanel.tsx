import { AllowDifferentStringOverlapButton } from '@/components/Studio/Settings/Preferences/AllowDifferentStringOverlapButton';
import { AllowSameStringOverlapButton } from '@/components/Studio/Settings/Preferences/AllowSameStringOverlapButton';
import { AutoMuteButton } from '@/components/Studio/Settings/Preferences/AutoMuteButton';
import { AutoMuteSlider } from '@/components/Studio/Settings/Preferences/AutoMuteSlider';
import { GuitarButton } from '@/components/Studio/Settings/Preferences/GuitarButton';
import { GuitarImage } from '@/components/Studio/Settings/Preferences/GuitarImage';
import { HoldToPlayButton } from '@/components/Studio/Settings/Preferences/HoldToPlayButton';
import { LoopModeButton } from '@/components/Studio/Settings/Preferences/LoopModeButton';
import { LoopModeSlider } from '@/components/Studio/Settings/Preferences/LoopModeSlider';
import { ShowKeyboardButton } from '@/components/Studio/Settings/Preferences/ShowKeyboardButton';
import { StringOrderGroup } from '@/components/Studio/Settings/Preferences/StringOrderGroup';
import { VolumeSlider } from '@/components/Studio/Settings/Preferences/VolumeSlider';

export const PreferencesPanel = () => {
    // TODO: SOLUCION TEMPORAL: OCULTAR LAS TECLAS EN PANTALLAS MENORES QUE 640PX sm:flex hidden
    return (
        <>
            <div className="flex flex-row justify-between sm:gap-4 gap-2 ">
                <div className="sm:flex hidden">
                    <StringOrderGroup />
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
