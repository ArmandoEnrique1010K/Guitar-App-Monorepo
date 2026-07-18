import { Compressor } from '@/components';
import { EffectFieldContainer } from '@/ui';

export const CompressorControls = () => {
    return (
        <>
            <EffectFieldContainer>
                <Compressor.AttackSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <Compressor.KneeSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <Compressor.RatioSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <Compressor.ReleaseSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <Compressor.ThresholdSlider />
            </EffectFieldContainer>
        </>
    );
};
