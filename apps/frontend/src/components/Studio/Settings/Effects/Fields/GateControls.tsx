import { Gate } from '@/components';
import { EffectFieldContainer } from '@/ui';

export const GateControls = () => {
    return (
        <>
            <EffectFieldContainer>
                <Gate.SmoothingSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <Gate.ThresholdSlider />
            </EffectFieldContainer>
        </>
    );
};
