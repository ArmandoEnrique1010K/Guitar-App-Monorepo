import { useControlBar } from '@/hooks/useControlBar';
import { LongSlider } from '@/ui/Studio/LongSlider';

export const RootChordSlider = () => {
    const { rootChord, setRootChord, minRootChord, maxRootChord } =
        useControlBar();

    return (
        <>
            <LongSlider
                value={rootChord}
                onChange={setRootChord}
                min={minRootChord}
                max={maxRootChord}
                title="Cambie el acorde inicial de la guitarra"
            />
        </>
    );
};
