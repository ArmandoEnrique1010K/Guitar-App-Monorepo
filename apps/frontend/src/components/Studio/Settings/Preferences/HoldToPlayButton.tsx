import { SwitchButton } from '@/ui/Studio/SwitchButton';
import { useState } from 'react';
import { HandIcon } from '@/icons/HandIcon';

export const HoldToPlayButton = () => {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <SwitchButton
            text="Mantener tecla pulsada"
            title="Manten pulsada una tecla para reproducir"
            value={darkMode}
            onClick={() => setDarkMode(!darkMode)}
            icon={<HandIcon className="w-6 h-6" />}
        />
    );
};
