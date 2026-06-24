import { useControlBar } from '@/hooks';
import { ZeroCircleFillIcon } from '@/icons';
import { SwitchButton } from '@/ui';

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
