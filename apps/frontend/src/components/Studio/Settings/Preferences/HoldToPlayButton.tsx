import { SwitchButton } from '@/ui';
import { HandIcon } from '@/icons';
import { usePreferences } from '@/hooks';

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
