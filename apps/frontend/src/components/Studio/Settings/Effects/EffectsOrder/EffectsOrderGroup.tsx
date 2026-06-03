import { useEffects } from '@/hooks/useEffects';
import type { Effects } from '@/schemas';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { Cross1Icon } from '@radix-ui/react-icons';
import { useEffect, useMemo } from 'react';

const ORDER_EFFECTS: Record<keyof Effects, string> = {
    distortion: 'Distorsión',
};
export const EffectsOrderGroup = () => {
    const { effectsOrder, setEffectsOrder } = useEffects();

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
            className="w-52 h-full bg-black p-1 border-2 border-t-slate-900 border-l-slate-900 border-r-slate-500
            border-b-slate-500"
        >
            <ul ref={parent} className="flex flex-col">
                {keysRowType.map((item, index) => (
                    <li
                        key={item.row}
                        className="
        h-6
        min-h-6
        max-h-6

        shrink-0
        select-none

        px-1
                    flex
                    items-center
                    gap-2

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
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                className="hover:cursor-pointer"
                                onPointerDown={(e) => e.stopPropagation()}
                            />
                        </label>
                        <div className="flex-1">
                            {index + 1}. {item.value}
                        </div>

                        {/* ELIMINA EL EFECTO */}
                        <button
                            className="bg-yellow-200 text-black font-bold hover:bg-green-500"
                            onClick={() => console.log('ELIMINANDO')}
                            onPointerDown={(e) => e.stopPropagation()}
                        >
                            <Cross1Icon />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
