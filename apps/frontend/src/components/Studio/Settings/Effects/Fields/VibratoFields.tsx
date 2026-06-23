import { VibratoDepthSlider } from '@/components/Studio/Settings/Effects/Fields/Vibrato/VibratoDepthSlider';
import { VibratoFrequencySlider } from '@/components/Studio/Settings/Effects/Fields/Vibrato/VibratoFrequencySlider';
import { VibratoTypeSelectButtons } from '@/components/Studio/Settings/Effects/Fields/Vibrato/VibratoTypeSelectButtons';
import { VibratoWetSlider } from '@/components/Studio/Settings/Effects/Fields/Vibrato/VibratoWetSlider';
import { EffectFieldContainer } from '@/ui';

export const VibratoParameters = () => {
    return (
        <>
            <EffectFieldContainer>
                <VibratoWetSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <VibratoFrequencySlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <VibratoDepthSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <VibratoTypeSelectButtons />
            </EffectFieldContainer>
        </>
    );
};
