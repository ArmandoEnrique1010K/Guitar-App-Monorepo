import { useControlBar } from '@/hooks/useControlBar';
import { ZeroCircleFillIcon } from '@/icons/ZeroCircleFillIcon';
import { SwitchButton } from '@/ui/Studio/SwitchButton';

export const LockOpenStringButton = () => {
    const { lockOpenString, toogleLockOpenString } = useControlBar();

    return (
        <SwitchButton
            text="Mostrar acorde inicial"
            title="Muestra el acorde inicial en la tablatura"
            value={lockOpenString}
            onClick={toogleLockOpenString}
            icon={<ZeroCircleFillIcon className="w-6 h-6" />}
        />
    );
};
