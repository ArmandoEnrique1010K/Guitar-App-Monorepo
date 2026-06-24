import {
    LockOpenStringButton,
    PauseButton,
    RootChordSlider,
} from '@/components';

export const ControlBarView = () => {
    return (
        <div className="flex flex-row sm:gap-4 gap-2">
            <LockOpenStringButton />
            <RootChordSlider />
            <PauseButton />
        </div>
    );
};
