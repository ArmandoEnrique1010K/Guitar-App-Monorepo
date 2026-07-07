import { useEffects } from '@/hooks';
import type { Effects } from '@/types';
import { EFFECTS_NAMES } from '@/translate/EffectsNames';
import { useSortable } from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';
import {
    CheckIcon,
    Cross1Icon,
    DragHandleDots2Icon,
} from '@radix-ui/react-icons';

type Props = {
    effectName: keyof Effects;
    index: number;
};

export const SortableEffectItem = ({ effectName, index }: Props) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: effectName,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const { effects, toggleEffect, removeEffectInstance } = useEffects();

    const enabled = effects[effectName].enabled;

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
                    <label className="flex items-center">
                        <button
                            type="button"
                            className={`
        size-4
        flex
        items-center
        justify-center

        ${enabled ? 'bg-green-500' : 'bg-slate-700'}
    `}
                            onClick={() => toggleEffect(effectName)}
                            onPointerDown={(e) => e.stopPropagation()}
                        >
                            {enabled && (
                                <CheckIcon className="text-white size-3" />
                            )}
                        </button>
                    </label>
                    <span className="flex-1 truncate">
                        {index + 1}. {EFFECTS_NAMES[effectName]}
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
                    onClick={() => removeEffectInstance(effectName)}
                    onPointerDown={(e) => e.stopPropagation()}
                >
                    <Cross1Icon />
                </button>
            </div>
        </li>
    );
};
