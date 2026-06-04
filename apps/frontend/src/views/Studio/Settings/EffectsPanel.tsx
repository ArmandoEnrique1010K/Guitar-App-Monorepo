import { LongButton } from '@/ui/Studio/LongButton';
import { EffectsOrderGroup } from '@/components/Studio/Settings/Effects/EffectsOrder/EffectsOrderGroup';
import { DownArrowIcon } from '@/icons/DownArrowIcon';
import { UpArrowIcon } from '@/icons/UpArrowIcon';
import { EffectSelector } from '@/components/Studio/Settings/Effects/EffectsOrder/EffectSelector';
import { CrossIcon } from '@/icons/CrossIcon';
import { useEffects } from '@/hooks/useEffects';

export const EffectsPanel = () => {
    const { currentEffectSelected } = useEffects();

    return (
        <div className="flex flex-row  sm:gap-2 gap-1 h-full ">
            <div className="flex flex-col gap-2">
                <EffectsOrderGroup />
                <EffectSelector />
            </div>

            <div className="flex flex-col sm:gap-2 gap-1 h-full">
                <LongButton
                    icon={<UpArrowIcon className="size-8" />}
                    onClick={() => {}}
                    title="Anterior efecto en fila"
                />
                <LongButton
                    icon={<CrossIcon className="size-8" />}
                    onClick={() => {}}
                    title="Eliminar efecto"
                />

                <LongButton
                    icon={<DownArrowIcon className="size-8" />}
                    onClick={() => {}}
                    title="Siguiente efecto en fila"
                />
            </div>

            <div className="h-full w-full">
                <div
                    className="
                flex flex-1 bg-black text-green-500 w-full max-w-full
                        text-xs
        uppercase        font-bold
p-1 border-2 border-t-slate-900 border-l-slate-900 border-r-slate-500
            border-b-slate-500

                "
                >
                    {currentEffectSelected || 'Sin efecto seleccionado'}
                </div>
            </div>
        </div>
    );
};
