import { LongButton } from '@/ui/Studio/LongButton';
import { EffectsOrderGroup } from '@/components/Studio/Settings/Effects/EffectsOrder/EffectsOrderGroup';
import { DownArrowIcon } from '@/icons/DownArrowIcon';
import { UpArrowIcon } from '@/icons/UpArrowIcon';
import { EffectSelector } from '@/components/Studio/Settings/Effects/EffectsOrder/EffectSelector';

export const EffectsPanel = () => {
    return (
        <div className="flex flex-row  sm:gap-4 gap-2 h-full ">
            <div className="flex flex-col gap-2">
                <EffectsOrderGroup />
                <EffectSelector />
            </div>

            <div className="flex flex-col gap-2">
                <LongButton
                    icon={<UpArrowIcon className="size-10" />}
                    onClick={() => {}}
                    title="Anterior efecto en fila"
                />

                <LongButton
                    icon={<DownArrowIcon className="size-10" />}
                    onClick={() => {}}
                    title="Siguiente efecto en fila"
                />
            </div>

            <div className="h-full">Efecto</div>
        </div>
    );
};
