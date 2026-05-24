import { useControlBar } from '@/hooks/useControlBar';
import { LongSlider } from '@/ui/Studio/LongSlider';

export const RootChordSlider = () => {
    const { rootChord, changeRootChord, minRootChord, maxRootChord } =
        useControlBar();

    return (
        <>
            <LongSlider
                value={rootChord}
                onChange={changeRootChord}
                min={minRootChord}
                max={maxRootChord}
                title="Cambie el acorde inicial de la guitarra"
            />
        </>
    );
};
