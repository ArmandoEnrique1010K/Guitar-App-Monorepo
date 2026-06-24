import { SparkleFillIcon } from '@/icons';
import { useAppStore } from '@/store';
import { LatchButton } from '@/ui';

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
