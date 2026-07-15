import { FeedbackDelay } from '@/components';
import { EffectFieldContainer } from '@/ui';

export const FeedbackDelayControls = () => {
    return (
        <>
            <EffectFieldContainer>
                <FeedbackDelay.WetSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <FeedbackDelay.DelayTimeSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <FeedbackDelay.FeedbackSlider />
            </EffectFieldContainer>
        </>
    );
};
