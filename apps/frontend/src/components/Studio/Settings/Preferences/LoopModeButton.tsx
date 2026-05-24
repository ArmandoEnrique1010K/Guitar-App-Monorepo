import { SwitchButton } from '@/ui/Studio/SwitchButton';
import { RepeatAltIcon } from '@/icons/RepeatAltIcon';
import { usePreferences } from '@/hooks/usePreferences';

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
