import { AutoFilter } from '@/components';
import { EffectFieldContainer } from '@/ui';

export const AutoFilterControls = () => {
    return (
        <>
            <EffectFieldContainer>
                <AutoFilter.WetSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <AutoFilter.BaseFrequencySlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <AutoFilter.DepthSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <AutoFilter.FrequencySlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <AutoFilter.OctavesSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <AutoFilter.TypeSelectButtons />
            </EffectFieldContainer>
        </>
    );
};
