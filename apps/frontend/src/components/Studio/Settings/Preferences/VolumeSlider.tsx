import { usePreferences } from '@/hooks/usePreferences';
import { HorizontalSlider } from '@/ui/Studio/HorizontalSlider';

export const VolumeSlider = () => {
    const { volume, setVolume } = usePreferences();

    return (
        <HorizontalSlider
            value={volume}
            onChange={setVolume}
            unit="%"
            step={1}
        />
    );
};
