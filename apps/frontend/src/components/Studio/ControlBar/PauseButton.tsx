import { PauseIcon } from '@/icons';
import { Button } from '@/ui';

export const PauseButton = () => {
    // TODO: PENDIENTE EL MECANISMO DE SILENCIAR
    return (
        <Button
            text="Silenciar todo"
            onClick={() => {}}
            title="Silencia todas las notas reproducidas"
            icon={<PauseIcon className="size-6" />}
        />
    );
};
