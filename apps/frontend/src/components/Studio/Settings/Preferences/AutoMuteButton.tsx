import { SwitchButton } from '@/ui/Studio/SwitchButton';
import { VolumeOffIcon } from '@/icons/VolumeOffIcon';
import { usePreferences } from '@/hooks/usePreferences';

export const AutoMuteButton = () => {
    const { autoMute, toogleAutoMute } = usePreferences();
    return (
        <SwitchButton
            text="Auto silenciar pulso"
            title="Silenciar nota reproducida luego de un cierto tiempo"
            value={autoMute}
            onClick={toogleAutoMute}
            icon={<VolumeOffIcon className="size-6" />}
        />
    );
};
