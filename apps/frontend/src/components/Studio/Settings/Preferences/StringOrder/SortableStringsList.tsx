import { usePreferences } from '@/hooks';
import { DndContext, closestCenter } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { SortableStringItem } from './SortableStringItem';
import {
    restrictToParentElement,
    restrictToVerticalAxis,
} from '@dnd-kit/modifiers';

import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

export const SortableStringsList = () => {
    const { stringOrder, moveString } = usePreferences();
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        if (active.id === over.id) return;

        const oldIndex = stringOrder.indexOf(active.id as number);

        const newIndex = stringOrder.indexOf(over.id as number);

        moveString(oldIndex, newIndex);
    };

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
            <SortableContext
                items={stringOrder}
                strategy={verticalListSortingStrategy}
            >
                <div
                    className="md:w-40 w-34 h-full bg-black p-1 border-2 border-t-slate-900 border-l-slate-900 border-r-slate-500
            border-b-slate-500"
                >
                    <ul className="flex flex-col">
                        {stringOrder.map((stringNumber, index) => (
                            <SortableStringItem
                                key={stringNumber}
                                stringNumber={stringNumber}
                                index={index}
                            />
                        ))}
                    </ul>
                </div>
            </SortableContext>
        </DndContext>
    );
};
