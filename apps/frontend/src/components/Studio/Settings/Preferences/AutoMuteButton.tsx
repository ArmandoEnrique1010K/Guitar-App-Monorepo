import { SwitchButton } from '@/ui/Studio/SwitchButton';
import { useState } from 'react';
import { VolumeOffIcon } from '@/icons/VolumeOffIcon';

export const AutoMuteButton = () => {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <SwitchButton
            text="Auto silenciar pulso"
            value={darkMode}
            onClick={() => setDarkMode(!darkMode)}
            icon={<VolumeOffIcon className="size-6" />}
        />
    );
};
