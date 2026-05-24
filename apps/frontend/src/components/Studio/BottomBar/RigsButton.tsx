import { useBottomBar } from '@/hooks/useBottomBar';
import { LatchButton } from '@/ui/Studio/LatchButton';
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
