import { SparkleFillIcon } from '@/icons/SparkleFillIcon';
import { useAppStore } from '@/store/useAppStore';
import { LatchButton } from '@/ui/Studio/LatchButton';

export const AssistantDesktopButton = () => {
    const togglePanel = useAppStore((state) => state.togglePanel);

    return (
        <>
            <LatchButton
                title="Hazle una pregunta a la Inteligencia Artificial"
                onClick={togglePanel}
                icon={<SparkleFillIcon className={'size-8'} />}
            />
        </>
    );
};
