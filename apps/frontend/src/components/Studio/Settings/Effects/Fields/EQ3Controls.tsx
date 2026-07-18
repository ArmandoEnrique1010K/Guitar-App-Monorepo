import { EQ3 } from '@/components';
import { EffectFieldContainer } from '@/ui';

export const EQ3Controls = () => {
    return (
        <>
            <EffectFieldContainer>
                <EQ3.LowSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <EQ3.MidSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <EQ3.HighSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <EQ3.LowFrequencySlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <EQ3.HighFrequencySlider />
            </EffectFieldContainer>
        </>
    );
};
