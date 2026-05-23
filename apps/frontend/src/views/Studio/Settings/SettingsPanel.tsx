import { LockOpenStringButton } from '../../../components/Studio/Settings/Preferences/Buttons/LockOpenStringButton';
import { HoldToPlayButton } from '../../../components/Studio/Settings/Preferences/Buttons/HoldToPlayButton';
import { MuteOnSameStringButton } from '../../../components/Studio/Settings/Preferences/Buttons/MuteOnSameStringButton';
import { MuteOnDifferentStringButton } from '../../../components/Studio/Settings/Preferences/Buttons/MuteOnDifferentStringButton';
import { ShowKeyboardButton } from '../../../components/Studio/Settings/Preferences/Buttons/ShowKeyboardButton';
import { LoopModeButton } from '../../../components/Studio/Settings/Preferences/Buttons/LoopModeButton';
import { AutoMuteButton } from '../../../components/Studio/Settings/Preferences/Buttons/AutoMuteButton';

export const SettingsPanel = () => {
    return (
        <div>
            SettingsPanel
            <div>
                <LockOpenStringButton />
                <HoldToPlayButton />
                <MuteOnSameStringButton />
                <MuteOnDifferentStringButton />
                <ShowKeyboardButton />
                <LoopModeButton />
                <AutoMuteButton />
            </div>
        </div>
    );
};
