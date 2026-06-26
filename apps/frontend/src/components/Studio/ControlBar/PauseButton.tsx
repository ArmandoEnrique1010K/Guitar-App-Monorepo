import { useFretboard, usePreferences } from '@/hooks';
import { PauseIcon } from '@/icons';
import { Button } from '@/ui';
import { useEffect } from 'react';

// Botón para silenciar todas las notas reproducidas
export const PauseButton = () => {
    const { stopAllNotes } = usePreferences();
    const { keyboardMode } = useFretboard();

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleKeyDown = (event: KeyboardEvent) => {
        // Evita que se reproduzca el sonido varias veces cuando se mantiene presionada la tecla
        if (event.repeat) return;

        if (event.code === 'Space') {
            // Desactiva el comportamiento por defecto de la tecla 'Espacio'
            // Solamente cuando no este en modo keyboard
            if (!keyboardMode) {
                event.preventDefault();
            }

            // TODO: ES IMPOSIBLE NO EJECUTAR ESTA FUNCIÓN CUANDO KEYBOARDMODE SEA FALSE
            stopAllNotes();
        }
    };

    return (
        <Button
            text="Silenciar todo"
            onClick={() => stopAllNotes()}
            title="Silencia todas las notas reproducidas"
            icon={<PauseIcon className="size-6" />}
        />
    );
};
