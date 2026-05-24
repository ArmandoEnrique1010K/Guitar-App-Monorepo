import { SparkleFillIcon } from '@/icons/SparkleFillIcon';
import { LatchButton } from '@/ui/Studio/LatchButton';

export const AssistantButton = () => {
    return (
        <>
            <LatchButton
                title="Hazle una pregunta a la Inteligencia Artificial"
                onClick={() => {}}
                icon={<SparkleFillIcon className={'size-8'} />}
            />
        </>
    );
};
