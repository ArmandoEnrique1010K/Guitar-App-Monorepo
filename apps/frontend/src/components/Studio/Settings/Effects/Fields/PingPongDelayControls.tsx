import { PingPongDelay } from '@/components';
import { EffectFieldContainer } from '@/ui';

export const PingPongDelayControls = () => {
    return (
        <>
            <EffectFieldContainer>
                <PingPongDelay.WetSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <PingPongDelay.FeedbackSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <PingPongDelay.DelayTimeSlider />
            </EffectFieldContainer>
        </>
    );
};
