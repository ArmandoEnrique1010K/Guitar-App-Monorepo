import { ZeroCircleFillIcon } from '@/icons/ZeroCircleFillIcon';
import { SwitchButton } from '@/ui/Studio/SwitchButton';
import { useState } from 'react';

export const LockOpenStringButton = () => {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <SwitchButton
            text="Mostrar acorde inicial"
            title="Muestra el acorde inicial en la tablatura"
            value={darkMode}
            onClick={() => setDarkMode(!darkMode)}
            icon={<ZeroCircleFillIcon className="w-6 h-6" />}
        />
    );
};
