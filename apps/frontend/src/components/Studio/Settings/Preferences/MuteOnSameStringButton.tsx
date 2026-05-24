import { SwitchButton } from '@/ui/Studio/SwitchButton';
import { WaveformIcon } from '@/icons/WaveformIcon';
import { usePreferences } from '@/hooks/usePreferences';

export const MuteOnSameStringButton = () => {
    const { muteOnSameString, toogleMuteOnSameString } = usePreferences();

    return (
        <SwitchButton
            text="Mantener misma cuerda"
            title="Mantener reproduciendo notas en la misma cuerda"
            value={muteOnSameString}
            onClick={toogleMuteOnSameString}
            icon={<WaveformIcon className="w-6 h-6" />}
        />
    );
};
