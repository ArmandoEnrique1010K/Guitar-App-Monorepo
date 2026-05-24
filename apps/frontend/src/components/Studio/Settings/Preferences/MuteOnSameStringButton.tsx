import { SwitchButton } from '@/ui/Studio/SwitchButton';
import { useState } from 'react';
import { WaveformIcon } from '@/icons/WaveformIcon';

export const MuteOnSameStringButton = () => {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <SwitchButton
            text="Mantener misma cuerda"
            value={darkMode}
            onClick={() => setDarkMode(!darkMode)}
            icon={<WaveformIcon className="w-6 h-6" />}
        />
    );
};
