import { EffectsDragAndDropOrder } from '@/components/Studio/Settings/Effects/EffectsOrder/EffectsDragAndDropOrder';
import { EffectAddSelector } from '@/components/Studio/Settings/Effects/EffectsOrder/EffectAddSelector';
import { useEffects } from '@/hooks/useEffects';
import { SingleButton } from '@/ui/Studio/SingleButton';
import { PreviousArrowIcon } from '@/icons/PreviousArrowIcon';
import { NextArrowIcon } from '@/icons/NextArrowIcon';
import { ResetIcon } from '@/icons/ResetIcon';
import { EFFECTS_NAMES } from '@/translate/EffectsNames';
import { EffectParameters } from '@/components/Studio/Settings/Effects/EffectParameters';
import { DistortionFields } from '@/components/Studio/Settings/Effects/Fields/DistortionFields';
import { ReverbFields } from '@/components/Studio/Settings/Effects/Fields/ReverbFields';
import { VibratoParameters } from '@/components/Studio/Settings/Effects/Fields/VibratoFields';
import { TremoloParameters } from '@/components/Studio/Settings/Effects/Fields/TremoloFields';
import { ChorusFields } from '@/components/Studio/Settings/Effects/Fields/ChorusFields';

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
                <EffectsDragAndDropOrder />
                <EffectAddSelector />
            </div>

            <div className="h-auto w-full flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                    <SingleButton
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
                    <SingleButton
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
                    <SingleButton
                        text="Siguiente efecto de la cadena"
                        onClick={() => handleNextEffect()}
                        disabled={
                            !currentEffectSelected || effectsOrder.length === 1
                        }
                        icon={<NextArrowIcon className="size-4" />}
                    />
                </div>

                <EffectParameters>
                    {currentEffectSelected === 'distortion' && (
                        <DistortionFields />
                    )}

                    {currentEffectSelected === 'reverb' && <ReverbFields />}

                    {currentEffectSelected === 'vibrato' && (
                        <VibratoParameters />
                    )}

                    {currentEffectSelected === 'tremolo' && (
                        <TremoloParameters />
                    )}

                    {currentEffectSelected === 'chorus' && <ChorusFields />}
                </EffectParameters>
            </div>
        </div>
    );
};
