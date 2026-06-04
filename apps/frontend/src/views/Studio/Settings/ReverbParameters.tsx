import { DecaySlider } from '@/components/Studio/Settings/Effects/Reverb/DecaySlider';
import { PreDelaySlider } from '@/components/Studio/Settings/Effects/Reverb/PreDelaySlider';
import { WetSlider } from '@/components/Studio/Settings/Effects/Reverb/WetSlider';

export const ReverbParameters = () => {
    return (
        <>
            <WetSlider />
            <DecaySlider />
            <PreDelaySlider />
        </>
    );
};
