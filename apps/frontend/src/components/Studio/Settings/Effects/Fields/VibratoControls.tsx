import { Vibrato } from '@/components';
import { EffectFieldContainer } from '@/ui';

export const VibratoControls = () => {
    return (
        <>
            <EffectFieldContainer>
                <Vibrato.WetSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <Vibrato.FrequencySlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <Vibrato.DepthSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <Vibrato.TypeSelectButtons />
            </EffectFieldContainer>
        </>
    );
};
