import { DistortionSlider } from '@/components/Studio/Settings/Effects/Distortion/DistortionSlider';
import { OversampleSelectButtons } from '@/components/Studio/Settings/Effects/Distortion/OversampleSelectButtons';
import { WetSlider } from '@/components/Studio/Settings/Effects/Distortion/WetSlider';

export const DistortionParameters = () => {
    return (
        <>
            <WetSlider />
            <DistortionSlider />
            <OversampleSelectButtons />
        </>
    );
};
