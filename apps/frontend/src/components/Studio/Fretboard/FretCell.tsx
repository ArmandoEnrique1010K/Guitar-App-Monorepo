import { useControlBar } from '@/hooks/useControlBar';
import { useFretboard } from '@/hooks/useFretboard';
import { usePreferences } from '@/hooks/usePreferences';
import { useEffect, useState } from 'react';

type Props = {
    audioUrl: string;
    noteIndex: number;
    keyToPress: string;
    keyToShow: string;
    stringIndex: number;
};

export const FretCell = ({
    audioUrl,
    noteIndex,
    keyToPress,
    keyToShow,
    stringIndex,
}: Props) => {
    const { showKeyboardKeys, loopMode, autoMute } = usePreferences();
    const { rootChord } = useControlBar();
    const { keyboardMode, playNote } = useFretboard();

    // Tecla presionada
    const [keyPressed, setKeyPressed] = useState(false);

    // Activo o si ha sido presionado por el teclado
    const [isActive, setIsActive] = useState(false);

    // Función para manejar el pulso del teclado
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.code === keyToPress && !keyPressed && keyboardMode) {
            setKeyPressed(true);
            setIsActive(true);

            // TODO: playSound(stringIndex, noteIndex, audioUrl);
            playNote(noteIndex);
        }
    };

    // Función para manejar el momento cuando se suelta el teclado
    const handleKeyUp = (event: KeyboardEvent) => {
        if (event.code === keyToPress) {
            setKeyPressed(false);
            setIsActive(false);

            if (autoMute) {
                handleStopSound();
            }

            if (loopMode) {
                // TODO: stopRepeatingNote(stringIndex, noteIndex);
            }
        }
    };

    // Función para manejar el click del mouse
    const handleMouseDown = () => {
        setIsActive(true);
        playNote(noteIndex);

        // TODO:     playSound(stringIndex, noteIndex, audioUrl);
    };

    // Función para manejar el mouse up
    const handleMouseUp = () => {
        setIsActive(false);

        if (autoMute) {
            handleStopSound();
        }

        if (loopMode) {
            // TODO: stopRepeatingNote(stringIndex, noteIndex)
        }
    };

    const handleMouseLeave = () => {
        setIsActive(false);
    };

    // Función para manejar la detencion del sonido
    const handleStopSound = () => {
        // TODO: stopAllInstances();

        if (loopMode) {
            // TODO: stopRepeatingNote(stringIndex, noteIndex);
        }
    };

    // EFECTO SECUNDARIO
    //* ADVERTENCIA: NO CAMBIAR EL ACORDE INICIAL 3 SE MANTIENE PULSADA UNA TECLA
    // TODO: SOLUCIONAR EL ERRROR MENCIONADO
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [keyToPress, autoMute, keyboardMode, rootChord]);

    return (
        <button
            // transition-all

            className={`
                    h-full
                    flex
                    items-center
                    justify-center

                    text-sm
                    uppercase
                    font-bold
                    tracking-widest
                    w-full
                    border
                    border-slate-600

                    cursor-pointer

                    hover:bg-slate-700


                    ${isActive ? 'bg-green-500 text-black' : 'bg-black text-green-500'}

                    active:bg-green-500
                    active:text-black
                    
                `}
            // NOTA: DEBEN TENER LOS MISMOS ESTILOS CUANDO SE PULSA CON EL TECLADO Y CON EL MOUSE
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
        >
            {/* CASO ESPECIAL SI SE TRATA DE LA TECLA 'Dead' */}
            {keyToShow === 'Dead' ? '`' : showKeyboardKeys ? keyToShow : ''}
        </button>
    );
};
