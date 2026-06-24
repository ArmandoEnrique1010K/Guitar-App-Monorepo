import { SwitchButton } from '@/ui';
import { VolumeOffIcon } from '@/icons';
import { usePreferences } from '@/hooks';

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
