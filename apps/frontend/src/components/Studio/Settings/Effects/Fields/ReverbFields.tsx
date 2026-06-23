import { EffectFieldContainer } from '@/ui';
import { ReverbPreDelaySlider } from './Reverb/ReverbPreDelaySlider';
import { ReverbWetSlider } from './Reverb/ReverbWetSlider';
import { ReverbDecaySlider } from './Reverb/ReverbDecaySlider';

export const ReverbFields = () => {
    return (
        <>
            <EffectFieldContainer>
                <ReverbWetSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <ReverbDecaySlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <ReverbPreDelaySlider />
            </EffectFieldContainer>
        </>
    );
};
