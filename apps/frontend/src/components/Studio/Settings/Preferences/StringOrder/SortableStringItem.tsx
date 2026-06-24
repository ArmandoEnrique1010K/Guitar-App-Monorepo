import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DragHandleDots2Icon } from '@radix-ui/react-icons';

const KEY_ROW_LABELS = {
    0: 'Sin teclas',
    1: 'Sin teclas',
    2: 'Fila Z - M',
    3: 'Fila A - Ñ',
    4: 'Fila Q - P',
    5: 'Fila 1 - 0',
};

type Props = {
    stringNumber: number;
    index: number;
};

export const SortableStringItem = ({ stringNumber, index }: Props) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: stringNumber,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <li
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`
                                        relative

        h-6

                shrink-0
select-none
    ${isDragging ? 'z-50 shadow-lg opacity-90' : ''} 

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
`}
        >
            <div className="flex flex-row justify-between w-full">
                <div className=" flex flex-row gap-2 items-start">
                    <DragHandleDots2Icon />
                    <span className="flex-1 truncate">
                        {index + 1}. {KEY_ROW_LABELS[stringNumber]}
                    </span>
                </div>
            </div>
        </li>
    );
};
