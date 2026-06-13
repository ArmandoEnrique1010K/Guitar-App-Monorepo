import { DepthSlider } from '@/components/Studio/Settings/Effects/Vibrato/DepthSlider';
import { FrequencySlider } from '@/components/Studio/Settings/Effects/Vibrato/FrequencySlider';
import { TypeSelectButtons } from '@/components/Studio/Settings/Effects/Vibrato/TypeSelectButtons';
import { WetSlider } from '@/components/Studio/Settings/Effects/Vibrato/WetSlider';

export const VibratoParameters = () => {
    return (
        <>
            <WetSlider />
            <FrequencySlider />
            <DepthSlider />
            <TypeSelectButtons />
        </>
    );
};
