import { DepthSlider } from '@/components/Studio/Settings/Effects/Tremolo/DepthSlider';
import { FrequencySlider } from '@/components/Studio/Settings/Effects/Tremolo/FrequencySlider';
import { SpreadSlider } from '@/components/Studio/Settings/Effects/Tremolo/SpreadSlider';
import { TypeSelectButtons } from '@/components/Studio/Settings/Effects/Tremolo/TypeSelectButtons';
import { WetSlider } from '@/components/Studio/Settings/Effects/Tremolo/WetSlider';

export const TremoloParameters = () => {
    return (
        <>
            <WetSlider />
            <FrequencySlider />
            <DepthSlider />
            <SpreadSlider />
            <TypeSelectButtons />
        </>
    );
};
