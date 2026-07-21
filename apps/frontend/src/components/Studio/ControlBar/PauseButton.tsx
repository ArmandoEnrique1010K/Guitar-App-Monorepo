import { useFretboard } from '@/hooks';
import { PauseIcon } from '@/icons';
import { Button } from '@/ui';
import { useEffect, useState } from 'react';

// Botón para silenciar todas las notas reproducidas
export const PauseButton = () => {
    const { stopAllNotes } = useFretboard();

    const [isKeyPressed, setIsKeyPressed] = useState(false);

    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const handleKeyDown = (event: KeyboardEvent) => {
        // Evita que se reproduzca el sonido varias veces cuando se mantiene presionada la tecla
        if (event.repeat) return;

        if (event.code === 'Space') {
            setIsKeyPressed(true);
            stopAllNotes();
        }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
        if (event.code === 'Space') {
            setIsKeyPressed(false);
        }
    };

    return (
        <Button
            text="Silenciar todo"
            onClick={() => stopAllNotes()}
            title="Silencia todas las notas reproducidas"
            isKeyPressed={isKeyPressed}
            icon={<PauseIcon className="size-6" />}
        />
    );
};
