import { SwitchButton } from '@/ui';
import { WaveformIcon } from '@/icons';
import { usePreferences } from '@/hooks';

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
