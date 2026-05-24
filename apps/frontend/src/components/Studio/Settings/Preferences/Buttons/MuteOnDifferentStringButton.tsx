import { SwitchButton } from '@/ui/Studio/SwitchButton';
import { useState } from 'react';
import { ShuffleIcon } from '@/icons/ShuffleIcon';

export const MuteOnDifferentStringButton = () => {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <SwitchButton
            text="Mantener entre cuerdas"
            value={darkMode}
            onClick={() => setDarkMode(!darkMode)}
            icon={<ShuffleIcon className="w-6 h-6" />}
        />
    );
};
