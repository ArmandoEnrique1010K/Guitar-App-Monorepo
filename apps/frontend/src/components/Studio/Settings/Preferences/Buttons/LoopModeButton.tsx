import { SwitchButton } from '@/components/Studio/Settings/Preferences/SwitchButton';
import { useState } from 'react';
import RepeatAlt from '@/icons/RepeatAlt.svg';

export const LoopModeButton = () => {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <SwitchButton
            text="Modo bucle a pulso"
            value={darkMode}
            onClick={() => setDarkMode(!darkMode)}
            icon={<img src={RepeatAlt} className="w-6 h-6" alt="Repeat" />}
        />
    );
};
