import { LockOpenStringButton } from '@/components/Studio/Settings/ControlBar/LockOpenStringButton';
import { PauseButton } from '@/components/Studio/Settings/ControlBar/PauseButton';
import { RootChordSlider } from '@/components/Studio/Settings/ControlBar/RootChordSlider';

export const ControlBar = () => {
    return (
        <div className="flex flex-row gap-4 p-2">
            <LockOpenStringButton />
            <RootChordSlider />
            <PauseButton />
        </div>
    );
};
