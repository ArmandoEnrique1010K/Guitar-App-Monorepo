import { useSettings } from '@/hooks';
import { RadioSignalIcon } from '@/icons';
import { LatchButton } from '@/ui';

export const EffectsButton = () => {
    const { selectedPanel, setSelectedPanel } = useSettings();

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
