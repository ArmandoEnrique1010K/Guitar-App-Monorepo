import { Phaser } from '@/components';
import { EffectFieldContainer } from '@/ui';

export const PhaserControls = () => {
    return (
        <>
            <EffectFieldContainer>
                <Phaser.WetSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <Phaser.FrequencySlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <Phaser.OctavesSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <Phaser.BaseFrequencySlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <Phaser.QSlider />
            </EffectFieldContainer>
        </>
    );
};
