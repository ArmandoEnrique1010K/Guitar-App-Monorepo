import { AssistantDesktopButton } from '@/components/Studio/BottomBar/AssistantDesktopButton';
import { AssistantMobileButton } from '@/components/Studio/BottomBar/AssistantMobileButton';
import { EffectsButton } from '@/components/Studio/BottomBar/EffectsButton';
import { PreferencesButton } from '@/components/Studio/BottomBar/PreferencesButton';
import { RigsButton } from '@/components/Studio/BottomBar/RigsButton';
import { useMediaQuery } from 'react-responsive';

export const BottomBarView = () => {
    const isDesktop = useMediaQuery({ minWidth: 1024 });

    return (
        <div className="flex flex-row p-2 bg-linear-to-r from-slate-700 to-slate-800 justify-between">
            <div className="flex flex-row gap-4">
                <PreferencesButton />
                <EffectsButton />
                <RigsButton />
                {!isDesktop && <AssistantMobileButton />}
            </div>
            {isDesktop && <AssistantDesktopButton />}
        </div>
    );
};
