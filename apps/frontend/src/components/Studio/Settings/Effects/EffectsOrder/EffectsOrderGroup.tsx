import { useEffects } from '@/hooks/useEffects';
import type { Effects } from '@/schemas';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import {
    CheckIcon,
    Cross1Icon,
    DragHandleDots2Icon,
} from '@radix-ui/react-icons';
import { useEffect, useMemo } from 'react';

const ORDER_EFFECTS: Record<keyof Effects, string> = {
    distortion: 'Distorsión',
    reverb: 'Reverberación',
};
export const EffectsOrderGroup = () => {
    const {
        effectsOrder,
        setEffectsOrder,
        effects,
        toggleEffect,
        removeEffectInstance,
    } = useEffects();

    const items = useMemo(() => {
        return effectsOrder.map((row) => ({
            row,
            value: ORDER_EFFECTS[row],
        }));
    }, [effectsOrder]);

    const [parent, keysRowType] = useDragAndDrop<
        HTMLUListElement,
        { row: keyof Effects; value: string }
    >(items, {
        sortable: true,
    });
    useEffect(() => {
        setEffectsOrder(keysRowType.map((item) => item.row));
    }, [keysRowType, setEffectsOrder]);

    return (
        <div
            className="w-60 h-full bg-black p-1 border-2 border-t-slate-900 border-l-slate-900 border-r-slate-500
            border-b-slate-500"
        >
            <ul ref={parent} className="flex flex-col">
                {keysRowType.map((item, index) => {
                    const enabled = effects[item.row].enabled;
                    return (
                        <li
                            key={item.row}
                            className="
        h-6

                shrink-0
select-none

                    flex
                    items-center
                    justify-start   


        bg-black
        text-green-400
        text-xs
        uppercase
        font-bold
        tracking-widest

        cursor-grab
        active:cursor-grabbing

        hover:bg-[#0000ff]
        hover:text-white



transition-colors


overflow-hidden
will-change-transform
        duration-75

                "
                        >
                            {/* HABILITA EL EFECTO */}
                            <div className="flex flex-row justify-between w-full">
                                <div className=" flex flex-row gap-2 items-start">
                                    <DragHandleDots2Icon />
                                    <label className="flex items-center">
                                        {/* <input
                                        type="checkbox"
                                        className="
                                        hover:cursor-pointer size-4         accent-green-500

                                        

"
                                        onPointerDown={(e) =>
                                            e.stopPropagation()
                                        }
                                    /> */}

                                        <button
                                            type="button"
                                            className={`
        size-4
        flex
        items-center
        justify-center

        ${enabled ? 'bg-green-500' : 'bg-slate-700'}
    `}
                                            onClick={() =>
                                                toggleEffect(item.row)
                                            }
                                            onPointerDown={(e) =>
                                                e.stopPropagation()
                                            }
                                        >
                                            {enabled && (
                                                <CheckIcon className="text-white size-3" />
                                            )}
                                        </button>
                                    </label>
                                    <span className="flex-1 truncate">
                                        {index + 1}. {item.value}
                                    </span>
                                </div>

                                {/* ELIMINA EL EFECTO */}
                                <button
                                    className="   
                                flex         
                                items-center
                                justify-center

            px-0.5
            mr-1

            bg-yellow-200
            text-black
            

            hover:bg-green-600
"
                                    onClick={() =>
                                        // TODO: PENDIENTE ESTA FUNCIÓN
                                        removeEffectInstance(item.row)
                                    }
                                    onPointerDown={(e) => e.stopPropagation()}
                                >
                                    <Cross1Icon />
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
