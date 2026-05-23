import { SwitchButton } from '@/components/Studio/Settings/Preferences/SwitchButton';
import { useState } from 'react';
import Keyboard from '@/icons/Keyboard.svg';

export const ShowKeyboardButton = () => {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <SwitchButton
            text="Ver teclas en pantalla"
            value={darkMode}
            onClick={() => setDarkMode(!darkMode)}
            icon={<img src={Keyboard} className="w-6 h-6" alt="Keyboard" />}
        />
    );
};
