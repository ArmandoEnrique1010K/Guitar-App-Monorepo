import { useControlBar } from '@/hooks';
import { FullWidthSlider } from '@/ui';

export const RootChordSlider = () => {
    const { rootChord, setRootChord, minRootChord, maxRootChord } =
        useControlBar();

    return (
        <>
            <FullWidthSlider
                value={rootChord}
                onChange={setRootChord}
                min={minRootChord}
                max={maxRootChord}
                title="Cambie el acorde inicial de la guitarra"
            />
        </>
    );
};
