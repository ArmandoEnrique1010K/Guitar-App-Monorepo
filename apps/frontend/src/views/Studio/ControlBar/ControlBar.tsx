import { LockOpenStringButton } from '@/components/Studio/ControlBar/LockOpenStringButton';
import { PauseButton } from '@/components/Studio/ControlBar/PauseButton';
import { RootChordSlider } from '@/components/Studio/ControlBar/RootChordSlider';

export const ControlBar = () => {
    return (
        <div className="flex flex-row sm:gap-4 gap-2 sm:p-2 p-1">
            <LockOpenStringButton />
            <RootChordSlider />
            <PauseButton />
        </div>
    );
};
