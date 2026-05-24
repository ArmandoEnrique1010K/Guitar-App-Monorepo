import { SwitchButton } from '@/ui/Studio/SwitchButton';
import { VolumeOffIcon } from '@/icons/VolumeOffIcon';
import { usePreferences } from '@/hooks/usePreferences';

export const AutoMuteButton = () => {
    const { autoMute, toggleAutoMute } = usePreferences();
    return (
        <SwitchButton
            text="Auto silenciar pulso"
            title="Silenciar nota reproducida luego de un cierto tiempo"
            value={autoMute}
            onClick={toggleAutoMute}
            icon={<VolumeOffIcon className="size-6" />}
        />
    );
};
