import { AssistantButton } from '@/components/Studio/BottomBar/AssistantButton';
import { EffectsButton } from '@/components/Studio/BottomBar/EffectsButton';
import { PreferencesButton } from '@/components/Studio/BottomBar/PreferencesButton';
import { RigsButton } from '@/components/Studio/BottomBar/RigsButton';

export const BottomBar = () => {
    return (
        <div className="flex flex-row gap-4 p-2">
            <PreferencesButton />
            <EffectsButton />
            <RigsButton />
            <AssistantButton />
        </div>
    );
};
