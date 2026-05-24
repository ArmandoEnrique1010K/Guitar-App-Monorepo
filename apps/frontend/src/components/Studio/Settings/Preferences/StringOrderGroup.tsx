import { useDragAndDrop } from '@formkit/drag-and-drop/react';

// Componente para mostrar el orden de las cuerdas
const initialKeysRow = [
    {
        row: 0,
        value: 'Sin teclas',
    },
    {
        row: 1,
        value: 'Sin teclas',
    },
    {
        row: 2,
        value: 'Fila Z - M',
    },
    {
        row: 3,
        value: 'Fila A - Ñ',
    },
    {
        row: 4,
        value: 'Fila Q - P',
    },
    {
        row: 5,
        value: 'Fila 1 - 0',
    },
];

export const StringOrderGroup = () => {
    // const [keysRowTypeState, setKeysRowTypeState] = useState<
    //     { row: number; value: string }[]
    // >([]);

    const [parent, keysRowType] = useDragAndDrop<
        HTMLUListElement,
        { row: number; value: string }
    >(initialKeysRow, {
        sortable: true,
    });

    // useEffect(() => {
    //     setKeysRow(keysRow.map(({ row }) => row));
    // }, [keysRowType, keysRow]);

    return (
        <div
            className="
        w-36
        bg-black
        p-1
            border-2
            border-t-slate-900
            border-l-slate-900
            border-r-slate-500
            border-b-slate-500
        "
        >
            <ul
                ref={parent}
                className="          
                    flex
                    flex-col
                "
            >
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
