import { SwitchButton } from '@/ui/Studio/SwitchButton';
import { WaveformIcon } from '@/icons/WaveformIcon';
import { usePreferences } from '@/hooks/usePreferences';

export const AllowSameStringOverlapButton = () => {
    const { allowSameStringOverlap, toggleAllowSameStringOverlap } =
        usePreferences();

    return (
        <SwitchButton
            text="Mantener misma cuerda"
            title="Mantener reproduciendo notas en la misma cuerda"
            value={allowSameStringOverlap}
            onClick={toggleAllowSameStringOverlap}
            icon={<WaveformIcon className="w-6 h-6" />}
        />
    );
};
