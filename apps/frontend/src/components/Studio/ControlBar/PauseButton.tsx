import { PauseIcon } from '@/icons/PauseIcon';
import { SingleButton } from '@/ui/Studio/SingleButton';

export const PauseButton = () => {
    // TODO: PENDIENTE EL MECANISMO DE SILENCIAR
    return (
        <SingleButton
            text="Silenciar todo"
            onClick={() => {}}
            title="Silencia todas las notas reproducidas"
            icon={<PauseIcon className="size-6" />}
        />
    );
};
