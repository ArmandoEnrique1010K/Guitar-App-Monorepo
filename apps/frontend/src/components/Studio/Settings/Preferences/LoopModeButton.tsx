import { SwitchButton } from '@/ui';
import { RepeatAltIcon } from '@/icons';
import { usePreferences } from '@/hooks';

export const LoopModeButton = () => {
    const { loopMode, toggleLoopMode } = usePreferences();

    return (
        <SwitchButton
            text="Modo bucle a pulso"
            value={loopMode}
            onClick={toggleLoopMode}
            icon={<RepeatAltIcon className="size-6" />}
            title="Mantén pulsada una tecla para activar el bucle de reproducción"
        />
    );
};
