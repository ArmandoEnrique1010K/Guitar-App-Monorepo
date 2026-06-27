import { Freeverb } from '@/components';
import { EffectFieldContainer } from '@/ui';

export const FreeverbControls = () => {
    return (
        <>
            <EffectFieldContainer>
                <Freeverb.WetSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <Freeverb.DampeningSlider />
            </EffectFieldContainer>
            <EffectFieldContainer>
                <Freeverb.RoomSizeSlider />
            </EffectFieldContainer>
        </>
    );
};
