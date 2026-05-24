import { HorizontalSlider } from '@/ui/Studio/HorizontalSlider';
import { useState } from 'react';

export const LoopModeSlider = () => {
    const [interval, setInterval] = useState(45);

    return (
        <HorizontalSlider
            value={interval}
            onChange={setInterval}
            unit="ms"
            step={1}
            min={50}
            max={3000}
        />
    );
};
