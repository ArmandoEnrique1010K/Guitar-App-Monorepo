import { SwitchButton } from '@/ui/Studio/SwitchButton';
import { useState } from 'react';
import { KeyboardIcon } from '@/icons/KeyboardIcon';

export const ShowKeyboardButton = () => {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <SwitchButton
            text="Ver teclas en pantalla"
            value={darkMode}
            onClick={() => setDarkMode(!darkMode)}
            icon={<KeyboardIcon className="size-6" />}
        />
    );
};
