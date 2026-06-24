import { Distortion } from '@/components';
import { EffectFieldContainer } from '@/ui';

export const DistortionControls = () => {
    return (
        <>
            <EffectFieldContainer>
                <Distortion.WetSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <Distortion.DistortionSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <Distortion.OversampleSelectButtons />
            </EffectFieldContainer>
        </>
    );
};
