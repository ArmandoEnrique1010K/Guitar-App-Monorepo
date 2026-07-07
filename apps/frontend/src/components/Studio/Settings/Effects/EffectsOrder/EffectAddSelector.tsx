import { useEffects } from '@/hooks';
import type { Effects } from '@/types';
// import { EffectOptionButton } from '@/ui';
import { EFFECTS_NAMES } from '@/translate/EffectsNames';
import { ActionMenu } from '@/components';
import { TriangleDownIcon } from '@radix-ui/react-icons';

export const EffectAddSelector = () => {
    const { addEffect, effectsOrder } = useEffects();

    // EFFECTS_NAMES CONTIENE LOS NOMBRES DE LOS EFECTOS DE SONIDO EN ESPAÑOL
    const availableEffects = Object.entries(EFFECTS_NAMES).filter(
        ([key]) => !effectsOrder.includes(key as keyof Effects),
    );

    return (
        <>
            <ActionMenu
                width="min-w-56"
                icon={
                    <div
                        className=" w-full
                relative
                flex
                items-center

                border-2
                uppercase
                font-bold
                tracking-wide
                select-none

                bg-linear-to-b
                from-gray-300
                to-gray-400

                border-t-gray-200
                border-l-gray-200
                border-r-gray-800
                border-b-gray-800

                shadow-inner
                text-black
            "
                    >
                        <div
                            className="
                    flex
                    flex-row
                    items-center
                    justify-between

                    w-full

                    px-2
                    py-1

                    pointer-events-none
                "
                        >
                            <span className="text-xs flex-1 text-left">
                                {'Agregue un efecto'}
                            </span>

                            <div className="border-l border-l-gray-700 pl-1 sm:flex hidden">
                                <TriangleDownIcon className="size-5" />
                            </div>
                        </div>
                    </div>
                }
                options={availableEffects.map(([key, value]) => ({
                    label: value,
                    onClick() {
                        addEffect(key as keyof Effects);
                    },
                }))}

                // {
                //     label: '',
                //     onClick() {

                //     },
                // }
            />

            {/* <EffectOptionButton
                options={availableEffects.map(([key, value]) => ({
                    value: key,
                    label: value,
                }))}
                onChange={(effectId) => {
                    console.log(effectId);

                    addEffect(effectId as keyof Effects);
                }}
            /> */}
        </>
    );
};
