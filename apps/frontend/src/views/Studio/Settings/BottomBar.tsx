import { AssistantButton } from '@/components/Studio/BottomBar/AssistantButton';
import { EffectsButton } from '@/components/Studio/BottomBar/EffectsButton';
import { PreferencesButton } from '@/components/Studio/BottomBar/PreferencesButton';
import { RigsButton } from '@/components/Studio/BottomBar/RigsButton';

export const BottomBar = () => {
    return (
        <div className="flex flex-row gap-4 p-2 bg-linear-to-r from-slate-700 to-slate-800">
            <PreferencesButton />
            <EffectsButton />
            <RigsButton />
            <AssistantButton />
        </div>
    );
};
