import { HorizontalSlider } from '@/ui';
import { usePreferences } from '@/hooks';

export const AutoMuteSlider = () => {
    const { autoMuteDelayMs, setAutoMuteDelayMs, autoMute } = usePreferences();

    return (
        <HorizontalSlider
            value={autoMuteDelayMs}
            onChange={setAutoMuteDelayMs}
            unit="ms"
            step={1}
            min={50}
            max={3000}
            disabled={!autoMute}
        />
    );
};
