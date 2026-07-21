import { useSettings } from '@/hooks';
import { FullWidthSlider } from '@/ui';

export const RootChordSlider = () => {
    const { rootChord, setRootChord, minRootChord, maxRootChord } =
        useSettings();

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
