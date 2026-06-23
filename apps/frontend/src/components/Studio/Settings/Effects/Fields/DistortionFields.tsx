import { EffectFieldContainer } from '@/ui';
import {
    DistortionWetSlider,
    DistortionDistortionSlider,
    DistortionOversampleSelectButtons,
} from '@/components';

export const DistortionFields = () => {
    return (
        <>
            <EffectFieldContainer>
                <DistortionWetSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <DistortionDistortionSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <DistortionOversampleSelectButtons />
            </EffectFieldContainer>
        </>
    );
};
