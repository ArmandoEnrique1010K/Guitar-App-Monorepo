import { SwitchButton } from '@/ui/Studio/SwitchButton';
import { useState } from 'react';
import { RepeatAltIcon } from '@/icons/RepeatAltIcon';

export const LoopModeButton = () => {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <SwitchButton
            text="Modo bucle a pulso"
            value={darkMode}
            onClick={() => setDarkMode(!darkMode)}
            icon={<RepeatAltIcon className="size-6" />}
        />
    );
};
