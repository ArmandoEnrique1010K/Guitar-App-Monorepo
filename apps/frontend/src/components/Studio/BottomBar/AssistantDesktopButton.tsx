import { useAssistant } from '@/hooks';
import { SparkleFillIcon } from '@/icons';
import { LatchButton } from '@/ui';

export const AssistantDesktopButton = () => {
    const { toggleAssistantPanel } = useAssistant();

    return (
        <>
            <LatchButton
                title="Hazle una pregunta a la Inteligencia Artificial"
                onClick={toggleAssistantPanel}
                icon={<SparkleFillIcon className={'size-8'} />}
            />
        </>
    );
};
