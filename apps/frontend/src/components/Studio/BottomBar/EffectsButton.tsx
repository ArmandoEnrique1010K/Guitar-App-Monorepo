import { useBottomBar } from '@/hooks/useBottomBar';
import { RadioSignalIcon } from '@/icons/RadioSignalIcon';
import { LatchButton } from '@/ui/Studio/LatchButton';

export const EffectsButton = () => {
    const { selectedPanel, setSelectedPanel } = useBottomBar();

    return (
        <>
            <LatchButton
                title="Panel de efectos de sonido encadenados"
                onClick={() => setSelectedPanel('effects')}
                selected={selectedPanel === 'effects'}
                icon={<RadioSignalIcon className={'size-8'} />}
            />
        </>
    );
};
