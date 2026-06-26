import { usePreferences } from '@/hooks';
import { HorizontalSlider } from '@/ui';

export const VolumeSlider = () => {
    const { volume, setVolume } = usePreferences();

    return (
        <HorizontalSlider
            label="Volumen"
            value={volume}
            onChange={setVolume}
            unit="%"
            step={1}
        />
    );
};
