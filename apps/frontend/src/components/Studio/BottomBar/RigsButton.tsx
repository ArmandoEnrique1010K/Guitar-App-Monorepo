import { useSettings } from '@/hooks';
import { StackIcon } from '@/icons';
import { LatchButton } from '@/ui';

export const RigsButton = () => {
    const { selectedPanel, setSelectedPanel } = useSettings();

    return (
        <>
            <LatchButton
                title="Panel de espacios de trabajo guardados por el usuario"
                onClick={() => setSelectedPanel('workspaces')}
                selected={selectedPanel === 'workspaces'}
                icon={<StackIcon className={'size-8'} />}
            />
        </>
    );
};
