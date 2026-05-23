import { SwitchButton } from '@/components/Studio/Settings/Preferences/SwitchButton';
import { useState } from 'react';
import Shuffle from '@/icons/Shuffle.svg';

export const MuteOnDifferentStringButton = () => {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <SwitchButton
            text="Mantener entre cuerdas"
            value={darkMode}
            onClick={() => setDarkMode(!darkMode)}
            icon={<img src={Shuffle} className="w-6 h-6" alt="Shuffle" />}
        />
    );
};
