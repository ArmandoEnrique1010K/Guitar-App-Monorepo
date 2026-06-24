import { useBottomBar } from '@/hooks';
import { EqualizerIcon } from '@/icons';
import { LatchButton } from '@/ui';

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
