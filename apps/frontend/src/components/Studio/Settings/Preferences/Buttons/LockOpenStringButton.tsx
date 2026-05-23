import { SwitchButton } from '@/components/Studio/Settings/Preferences/SwitchButton';
import { useState } from 'react';
import ZeroCircleFill from '@/icons/ZeroCircleFill.svg';

export const LockOpenStringButton = () => {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <SwitchButton
            text="Mostrar acorde inicial"
            title="Muestra el acorde inicial en la tablatura"
            value={darkMode}
            onClick={() => setDarkMode(!darkMode)}
            icon={
                <img
                    src={ZeroCircleFill}
                    className="w-6 h-6"
                    alt="Zero Circle Fill"
                />
            }
        />
    );
};
