import {
    ChorusControls,
    DistortionControls,
    EffectAddSelector,
    EffectControlsContainer,
    ReverbControls,
    SortableEffectsList,
    TremoloControls,
    VibratoControls,
} from '@/components';
import { useEffects } from '@/hooks';
import { Button } from '@/ui';
import { PreviousArrowIcon, NextArrowIcon, ResetIcon } from '@/icons';
import { EFFECTS_NAMES } from '@/translate/EffectsNames';

export const EffectsView = () => {
    const {
        currentEffectSelected,
        setCurrentEffectSelected,
        effectsOrder,
        resetDefaultValuesEffectInstance,
    } = useEffects();

    const handlePreviousEffect = () => {
        if (!currentEffectSelected) return;

        const currentIndex = effectsOrder.indexOf(currentEffectSelected);

        const previousIndex =
            (currentIndex - 1 + effectsOrder.length) % effectsOrder.length;

        setCurrentEffectSelected(effectsOrder[previousIndex]);
    };

    const handleNextEffect = () => {
        if (!currentEffectSelected) return;

        const currentIndex = effectsOrder.indexOf(currentEffectSelected);

        const nextIndex = (currentIndex + 1) % effectsOrder.length;

        setCurrentEffectSelected(effectsOrder[nextIndex]);
    };

    return (
        <div className="flex flex-row  sm:gap-2 gap-1 h-full ">
            <div className="flex flex-col gap-2">
                <SortableEffectsList />
                <EffectAddSelector />
            </div>

            <div className="h-auto w-full flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                    <Button
                        title="Anterior efecto de la cadena"
                        text="Previous"
                        onClick={() => handlePreviousEffect()}
                        disabled={
                            !currentEffectSelected || effectsOrder.length === 1
                        }
                        icon={<PreviousArrowIcon className="size-4" />}
                    />
                    <div
                        className="
                flex  bg-black text-green-500 flex-1
                        text-xs
        uppercase        font-bold
p-1 border-2 border-t-slate-900 border-l-slate-900 border-r-slate-500
            border-b-slate-500
            items-center justify-center
                "
                    >
                        {EFFECTS_NAMES[currentEffectSelected] ||
                            'Sin efecto seleccionado'}
                    </div>
                    <Button
                        title="Establecer valores predeterminados"
                        text="Reset"
                        onClick={() =>
                            resetDefaultValuesEffectInstance(
                                currentEffectSelected,
                            )
                        }
                        disabled={!currentEffectSelected}
                        icon={<ResetIcon className="size-4" />}
                    />
                    <Button
                        text="Siguiente efecto de la cadena"
                        onClick={() => handleNextEffect()}
                        disabled={
                            !currentEffectSelected || effectsOrder.length === 1
                        }
                        icon={<NextArrowIcon className="size-4" />}
                    />
                </div>

                <EffectControlsContainer>
                    {currentEffectSelected === 'distortion' && (
                        <DistortionControls />
                    )}

                    {currentEffectSelected === 'reverb' && <ReverbControls />}

                    {currentEffectSelected === 'vibrato' && <VibratoControls />}

                    {currentEffectSelected === 'tremolo' && <TremoloControls />}

                    {currentEffectSelected === 'chorus' && <ChorusControls />}
                </EffectControlsContainer>
            </div>
        </div>
    );
};
