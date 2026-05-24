import { useBottomBar } from '@/hooks/useBottomBar';
import { EqualizerIcon } from '@/icons/EqualizerIcon';
import { LatchButton } from '@/ui/Studio/LatchButton';

export const PreferencesButton = () => {
    const { selectedPanel, setSelectedPanel } = useBottomBar();

    return (
        <>
            <LatchButton
                title="Panel de configuraciones de la guitarra"
                onClick={() => setSelectedPanel('preferences')}
                selected={selectedPanel === 'preferences'}
                icon={<EqualizerIcon className={'size-8'} />}
            />
        </>
    );
};
