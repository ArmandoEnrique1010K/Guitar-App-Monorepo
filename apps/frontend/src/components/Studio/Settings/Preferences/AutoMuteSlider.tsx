import { HorizontalSlider } from '@/ui/Studio/HorizontalSlider';
import { usePreferences } from '@/hooks/usePreferences';

export const AutoMuteSlider = () => {
    const { autoMuteDelayMs, changeAutoMuteDelayMs, autoMute } =
        usePreferences();

    return (
        <HorizontalSlider
            value={autoMuteDelayMs}
            onChange={changeAutoMuteDelayMs}
            unit="ms"
            step={1}
            min={50}
            max={3000}
            disabled={!autoMute}
        />
    );
};
