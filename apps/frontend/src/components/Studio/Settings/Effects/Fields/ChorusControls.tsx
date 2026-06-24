import { Chorus } from '@/components';
import { EffectFieldContainer } from '@/ui';

export const ChorusControls = () => {
    return (
        <>
            <EffectFieldContainer>
                <Chorus.WetSlider />
            </EffectFieldContainer>
        </>
    );
};
