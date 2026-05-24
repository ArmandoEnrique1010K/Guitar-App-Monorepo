import { AutoMuteButton } from '@/components/Studio/Settings/Preferences/Buttons/AutoMuteButton';
import { HorizontalSlider } from '@/ui/Studio/HorizontalSlider';
import { PauseButton } from '@/components/Studio/Settings/Preferences/PauseButton';
import { useState } from 'react';
import { LongSlider } from '@/ui/Studio/LongSlider';
import { LockOpenStringButton } from '@/components/Studio/Settings/Preferences/Buttons/LockOpenStringButton';
import { HoldToPlayButton } from '@/components/Studio/Settings/Preferences/Buttons/HoldToPlayButton';
import { MuteOnSameStringButton } from '@/components/Studio/Settings/Preferences/Buttons/MuteOnSameStringButton';
import { MuteOnDifferentStringButton } from '@/components/Studio/Settings/Preferences/Buttons/MuteOnDifferentStringButton';
import { ShowKeyboardButton } from '@/components/Studio/Settings/Preferences/Buttons/ShowKeyboardButton';
import { LoopModeButton } from '@/components/Studio/Settings/Preferences/Buttons/LoopModeButton';

export const SettingsPanel = () => {
    const [volume, setVolume] = useState(45);
    const [initialChord, setInitialChord] = useState(1);

    return (
        <div className=" bg-linear-to-r from-slate-700 to-slate-800">
            SettingsPanel
            <div>
                <LockOpenStringButton />
                <HoldToPlayButton />
                <MuteOnSameStringButton />
                <MuteOnDifferentStringButton />
                <ShowKeyboardButton />
                <LoopModeButton />
                <AutoMuteButton />
                <PauseButton />
                <HorizontalSlider
                    label="Volumen"
                    value={volume}
                    onChange={setVolume}
                    unit="%"
                    step={1}
                />

                <LongSlider
                    value={initialChord}
                    onChange={setInitialChord}
                    min={1}
                    max={13}
                />
            </div>
        </div>
    );
};
