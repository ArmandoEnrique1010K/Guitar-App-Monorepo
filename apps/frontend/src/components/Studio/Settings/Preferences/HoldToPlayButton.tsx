import { SwitchButton } from '@/ui/Studio/SwitchButton';
import { HandIcon } from '@/icons/HandIcon';
import { usePreferences } from '@/hooks/usePreferences';

export const HoldToPlayButton = () => {
    const { holdToPlay, toggleHoldToPlay } = usePreferences();

    return (
        <SwitchButton
            text="Mantener tecla pulsada"
            title="Manten pulsada una tecla para reproducir"
            value={holdToPlay}
            onClick={toggleHoldToPlay}
            icon={<HandIcon className="w-6 h-6" />}
        />
    );
};
