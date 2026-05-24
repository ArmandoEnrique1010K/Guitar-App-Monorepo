import { HorizontalSlider } from '@/ui/Studio/HorizontalSlider';
import { useState } from 'react';

export const VolumeSlider = () => {
    const [volume, setVolume] = useState(45);

    return (
        <HorizontalSlider
            value={volume}
            onChange={setVolume}
            unit="%"
            step={1}
        />
    );
};
