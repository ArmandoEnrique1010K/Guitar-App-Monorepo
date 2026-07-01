import { usePreferences } from '@/hooks';
import { HorizontalSlider } from '@/ui';

export const VolumeSlider = () => {
    const { volume, setVolume } = usePreferences();

    return (
        <HorizontalSlider
            label="Volumen"
            value={volume}
            onChange={(value) => {
                // console.log(value);
                setVolume(value);
            }}
            unit="%"
            step={1}
        />
    );
};
