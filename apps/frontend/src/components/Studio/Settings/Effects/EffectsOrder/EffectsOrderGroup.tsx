import { useEffects } from '@/hooks/useEffects';
import { EffectsOrderGroupContent } from './EffectsOrderGroupContent';

export const EffectsOrderGroup = () => {
    const { effectsOrder } = useEffects();

    return (
        <div
            className="w-60 h-full bg-black p-1 border-2 border-t-slate-900 border-l-slate-900 border-r-slate-500
            border-b-slate-500"
        >
            {/* Por alguna razon la prop key es necesaria para que el componente se actualice cuando cambia el orden */}
            <EffectsOrderGroupContent key={effectsOrder.join('|')} />
        </div>
    );
};
