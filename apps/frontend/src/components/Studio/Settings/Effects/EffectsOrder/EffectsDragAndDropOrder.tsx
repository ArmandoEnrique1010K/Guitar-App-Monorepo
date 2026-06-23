import { useEffects } from '@/hooks/useEffects';
import { DndContext, closestCenter } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';

import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { Effects } from '@/schemas';
import { SortableEffectItem } from './SortableEffectItem';
import {
    restrictToVerticalAxis,
    restrictToParentElement,
} from '@dnd-kit/modifiers';
export const EffectsDragAndDropOrder = () => {
    const { effectsOrder, moveEffect } = useEffects();

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        if (active.id === over.id) return;

        const oldIndex = effectsOrder.indexOf(active.id as keyof Effects);

        const newIndex = effectsOrder.indexOf(over.id as keyof Effects);

        moveEffect(oldIndex, newIndex);
    };

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
            <SortableContext
                items={effectsOrder}
                strategy={verticalListSortingStrategy}
            >
                <div
                    className="w-56 h-full bg-black p-1 border-2 border-t-slate-900 border-l-slate-900 border-r-slate-500
            border-b-slate-500"
                >
                    <ul className="flex flex-col">
                        {effectsOrder.map((effectName, index) => (
                            <SortableEffectItem
                                key={effectName}
                                effectName={effectName}
                                index={index}
                            />
                        ))}
                    </ul>
                </div>
            </SortableContext>
        </DndContext>
    );
};
