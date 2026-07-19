import { useBottomBar } from '@/hooks';
import { StackIcon } from '@/icons';
import { LatchButton } from '@/ui';

export const RigsButton = () => {
    const { selectedPanel, setSelectedPanel } = useBottomBar();

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
