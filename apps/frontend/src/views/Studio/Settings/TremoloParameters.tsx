import { FrequencySlider } from '@/components/Studio/Settings/Effects/Tremolo/FrequencySlider';
import { SpreadSlider } from '@/components/Studio/Settings/Effects/Tremolo/SpreadSlider';
import { TypeSelectButtons } from '@/components/Studio/Settings/Effects/Tremolo/TypeSelectButtons';
import { WetSlider } from '@/components/Studio/Settings/Effects/Tremolo/WetSlider';
import { DepthSlider } from '@/components/Studio/Settings/Effects/Tremolo/DepthSlider';
import { EffectFieldContainer } from '@/components/Studio/Settings/Effects/EffectFieldContainer';

export const TremoloParameters = () => {
    return (
        <>
            <EffectFieldContainer>
                <WetSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <FrequencySlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <DepthSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <SpreadSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <TypeSelectButtons />
            </EffectFieldContainer>
        </>
    );
};
