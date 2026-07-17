import { PitchShift } from '@/components';
import { EffectFieldContainer } from '@/ui';

export const PitchShiftControls = () => {
    return (
        <>
            <EffectFieldContainer>
                <PitchShift.WetSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <PitchShift.DelayTimeSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <PitchShift.FeedbackSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <PitchShift.PitchSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <PitchShift.WindowSizeSlider />
            </EffectFieldContainer>
        </>
    );
};
