import { Reverb } from '@/components';
import { EffectFieldContainer } from '@/ui';

export const ReverbControls = () => {
    return (
        <>
            <EffectFieldContainer>
                <Reverb.WetSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <Reverb.DecaySlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <Reverb.PreDelaySlider />
            </EffectFieldContainer>
        </>
    );
};
