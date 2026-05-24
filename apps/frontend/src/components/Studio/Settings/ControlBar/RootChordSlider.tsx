import { LongSlider } from '@/ui/Studio/LongSlider';
import { useState } from 'react';

export const RootChordSlider = () => {
    const [initialChord, setInitialChord] = useState(1);

    return (
        <>
            <LongSlider
                value={initialChord}
                onChange={setInitialChord}
                min={1}
                max={13}
            />
        </>
    );
};
