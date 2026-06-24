import { useBottomBar } from '@/hooks';
import { LatchButton } from '@/ui';
import { StackIcon } from '@radix-ui/react-icons';

export const RigsButton = () => {
    const { selectedPanel, setSelectedPanel } = useBottomBar();

    return (
        <>
            <LatchButton
                title="Panel de pedales guardados por el usuario"
                onClick={() => setSelectedPanel('rigs')}
                selected={selectedPanel === 'rigs'}
                icon={<StackIcon className={'size-8'} />}
            />
        </>
    );
};
