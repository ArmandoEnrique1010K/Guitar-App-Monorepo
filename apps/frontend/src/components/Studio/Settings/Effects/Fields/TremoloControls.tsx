import { Tremolo } from '@/components';
import { EffectFieldContainer } from '@/ui';

export const TremoloControls = () => {
    return (
        <>
            <EffectFieldContainer>
                <Tremolo.WetSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <Tremolo.FrequencySlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <Tremolo.DepthSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <Tremolo.SpreadSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <Tremolo.TypeSelectButtons />
            </EffectFieldContainer>
        </>
    );
};
