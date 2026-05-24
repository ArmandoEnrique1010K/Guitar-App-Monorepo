import { useControlBar } from '@/hooks/useControlBar';
import { ZeroCircleFillIcon } from '@/icons/ZeroCircleFillIcon';
import { SwitchButton } from '@/ui/Studio/SwitchButton';

export const LockOpenStringButton = () => {
    const { lockOpenString, toggleLockOpenString } = useControlBar();

    return (
        <SwitchButton
            text="Mostrar acorde inicial"
            title="Muestra el acorde inicial en la tablatura"
            value={lockOpenString}
            onClick={toggleLockOpenString}
            icon={<ZeroCircleFillIcon className="w-6 h-6" />}
        />
    );
};
