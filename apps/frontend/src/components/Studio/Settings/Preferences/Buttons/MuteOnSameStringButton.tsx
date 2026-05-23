import { SwitchButton } from '@/components/Studio/Settings/Preferences/SwitchButton';
import { useState } from 'react';
import Waveform from '@/icons/Waveform.svg';

export const MuteOnSameStringButton = () => {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <SwitchButton
            text="Mantener misma cuerda"
            value={darkMode}
            onClick={() => setDarkMode(!darkMode)}
            icon={<img src={Waveform} className="w-6 h-6" alt="Waveform" />}
        />
    );
};
