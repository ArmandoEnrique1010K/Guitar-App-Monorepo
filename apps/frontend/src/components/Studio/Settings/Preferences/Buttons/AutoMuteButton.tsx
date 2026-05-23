import { SwitchButton } from '@/components/Studio/Settings/Preferences/SwitchButton';
import { useState } from 'react';
import VolumeOff from '@/icons/VolumeOff.svg';

export const AutoMuteButton = () => {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <SwitchButton
            text="Auto silenciar pulso"
            value={darkMode}
            onClick={() => setDarkMode(!darkMode)}
            icon={<img src={VolumeOff} className="w-6 h-6" alt="Volume Off" />}
        />
    );
};
