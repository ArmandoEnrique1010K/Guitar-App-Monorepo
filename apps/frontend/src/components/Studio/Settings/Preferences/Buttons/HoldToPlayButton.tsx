import { SwitchButton } from '@/components/Studio/Settings/Preferences/SwitchButton';
import Hand from '@/icons/Hand.svg';
import { useState } from 'react';

export const HoldToPlayButton = () => {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <SwitchButton
            text="Mantener tecla pulsada"
            title="Manten pulsada una tecla para reproducir"
            value={darkMode}
            onClick={() => setDarkMode(!darkMode)}
            icon={<img src={Hand} className="w-6 h-6" alt="Hand" />}
        />
    );
};
