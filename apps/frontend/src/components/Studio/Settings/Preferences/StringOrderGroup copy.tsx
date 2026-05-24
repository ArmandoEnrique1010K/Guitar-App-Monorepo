import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { animations } from '@formkit/drag-and-drop';

// USAR EL DISEÑO PARA LOS BOTONES DE LA GUITARRA
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
        plugins: [animations()],
    });

    // useEffect(() => {
    //     setKeysRow(keysRow.map(({ row }) => row));
    // }, [keysRowType, keysRow]);

    return (
        <div
            className="
        w-40
        bg-zinc-900
        border
        border-zinc-700
        p-2

        bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)]
        bg-size-[4px_4px]

        shadow-[0_0_10px_rgba(0,0,0,0.8)]
        
        "
        >
            <ul
                ref={parent}
                className="            flex
            flex-col
            gap-1
"
            >
                {keysRowType.map((item) => (
                    <li
                        key={item.row}
                        className="
                    h-6
                    flex
                    items-center
                    justify-center

                    bg-black
                    text-green-400
                    text-[11px]
                    uppercase
                    font-bold
                    tracking-widest

                    border
                    border-zinc-700

                    shadow-[0_0_4px_rgba(74,222,128,0.35)]

                    cursor-grab
                    active:cursor-grabbing

                    hover:bg-zinc-800
                    transition-all
                "
                    >
                        {item.value}
                    </li>
                ))}
            </ul>
        </div>
    );
};
