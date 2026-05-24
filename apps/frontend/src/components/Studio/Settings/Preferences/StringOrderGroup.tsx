import { usePreferences } from '@/hooks/usePreferences';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { useEffect, useMemo } from 'react';

const KEY_ROW_LABELS = [
    'Fila 1 - 0',
    'Fila Q - P',
    'Fila A - Ñ',
    'Fila Z - M',
    'Sin teclas',
    'Sin teclas',
];

// Componente para mostrar el orden de las cuerdas
export const StringOrderGroup = () => {
    // El tipo de stringOrder es arreglo de numeros
    const { stringOrder, changeStringOrder } = usePreferences();

    // Derivamos los objetos desde Zustand
    const items = useMemo(() => {
        return stringOrder.map((row) => ({
            row,
            value: KEY_ROW_LABELS[row],
        }));
    }, [stringOrder]);

    const [parent, keysRowType] = useDragAndDrop<
        HTMLUListElement,
        { row: number; value: string }
    >(items, {
        sortable: true,
    });

    // Cuando cambia el drag and drop
    // actualizamos Zustand
    useEffect(() => {
        // console.log(keysRowType.map((item) => item.row));

        changeStringOrder(keysRowType.map((item) => item.row));
    }, [keysRowType, changeStringOrder]);

    return (
        <div
            className="w-36 bg-black p-1 border-2 border-t-slate-900 border-l-slate-900 border-r-slate-500
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

                    flex
                    items-center
                    pl-1

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
                        {index + 1}. {item.value}
                    </li>
                ))}
            </ul>
        </div>
    );
};
