import { HorizontalSlider } from '@/ui/Studio/HorizontalSlider';
import { usePreferences } from '@/hooks/usePreferences';

export const LoopModeSlider = () => {
    const { loopIntervalMs, changeLoopIntervalMs, loopMode } = usePreferences();

    return (
        <HorizontalSlider
            value={loopIntervalMs}
            onChange={changeLoopIntervalMs}
            unit="ms"
            step={1}
            min={50}
            max={3000}
            disabled={!loopMode}
        />
    );
};
