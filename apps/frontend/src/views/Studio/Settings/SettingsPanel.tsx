import { DynamicSlider } from '@/components/Studio/Settings/Preferences/DynamicSlider';
import { useState } from 'react';

export const SettingsPanel = () => {
    const [volume, setVolume] = useState(45);

    return (
        <div>
            SettingsPanel
            <div>
                {/* <LockOpenStringButton />
                <HoldToPlayButton />
                <MuteOnSameStringButton />
                <MuteOnDifferentStringButton />
                <ShowKeyboardButton />
                <LoopModeButton />
                <AutoMuteButton />
                <PauseButton /> */}
                <DynamicSlider
                    label="Volume"
                    value={volume}
                    onChange={setVolume}
                />
            </div>
        </div>
    );
};
