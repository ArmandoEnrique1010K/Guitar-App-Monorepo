import { useAssistant } from '@/hooks/useAssistant';
import { SparkleFillIcon } from '@/icons/SparkleFillIcon';
import { LatchButton } from '@/ui/Studio/LatchButton';

export const AssistantButton = () => {
    const { toogleShowPanel } = useAssistant();

    return (
        <>
            <LatchButton
                title="Hazle una pregunta a la Inteligencia Artificial"
                onClick={() => toogleShowPanel()}
                icon={<SparkleFillIcon className={'size-8'} />}
            />
        </>
    );
};
