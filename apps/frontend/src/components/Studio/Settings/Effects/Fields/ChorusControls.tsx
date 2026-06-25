import { Chorus } from '@/components';
import { EffectFieldContainer } from '@/ui';

export const ChorusControls = () => {
    return (
        <>
            <EffectFieldContainer>
                <Chorus.WetSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <Chorus.DelayTImeSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <Chorus.DepthSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <Chorus.FrequencySlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <Chorus.FeedbackSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <Chorus.SpreadSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <Chorus.TypeSelectButtons />
            </EffectFieldContainer>
        </>
    );
};
