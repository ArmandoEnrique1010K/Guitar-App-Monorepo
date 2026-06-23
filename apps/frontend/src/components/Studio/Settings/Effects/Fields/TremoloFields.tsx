import { EffectFieldContainer } from '@/ui';
import { TremoloFrequencySlider } from './Tremolo/TremoloFrequencySlider';
import { TremoloWetSlider } from './Tremolo/TremoloWetSlider';
import { TremoloDepthSlider } from './Tremolo/TremoloDepthSlider';
import { TremoloSpreadSlider } from './Tremolo/TremoloSpreadSlider';
import { TremoloTypeSelectButtons } from './Tremolo/TremoloTypeSelectButtons';

export const TremoloParameters = () => {
    return (
        <>
            <EffectFieldContainer>
                <TremoloWetSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <TremoloFrequencySlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <TremoloDepthSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <TremoloSpreadSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <TremoloTypeSelectButtons />
            </EffectFieldContainer>
        </>
    );
};
