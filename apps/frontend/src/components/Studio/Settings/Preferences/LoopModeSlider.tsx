import { HorizontalSlider } from '@/ui';
import { usePreferences } from '@/hooks';

export const LoopModeSlider = () => {
    const { loopIntervalMs, setLoopIntervalMs, loopMode } = usePreferences();

    return (
        <HorizontalSlider
            value={loopIntervalMs}
            onChange={setLoopIntervalMs}
            unit="ms"
            step={1}
            min={50}
            max={3000}
            disabled={!loopMode}
        />
    );
};
