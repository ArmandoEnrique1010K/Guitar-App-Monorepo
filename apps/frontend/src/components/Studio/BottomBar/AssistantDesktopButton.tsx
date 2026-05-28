import { useAssistant } from '@/hooks/useAssistant';
import { SparkleFillIcon } from '@/icons/SparkleFillIcon';
import { LatchButton } from '@/ui/Studio/LatchButton';

export const AssistantDesktopButton = () => {
    const { togglePanel } = useAssistant();

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
