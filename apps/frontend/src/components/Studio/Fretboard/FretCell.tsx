import {
    useControlBar,
    useEffects,
    useFretboard,
    usePreferences,
} from '@/hooks';
import { useAppStore } from '@/store';
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
    const { showKeyboardKeys, loopMode, loopIntervalMs, autoMute, holdToPlay } =
        usePreferences();
    const { rootChord } = useControlBar();
    const { keyboardMode, playNote, stopNote, stopRepeatingNote } =
        useFretboard();

    const volumeNode = useAppStore((state) => state.volumeNode);

    // Tecla presionada
    const [keyPressed, setKeyPressed] = useState(false);

    // Activo o si ha sido presionado por el teclado
    const [isActive, setIsActive] = useState(false);
    // Función para manejar la detencion del sonido
    const handleStopSound = () => {
        stopNote(stringIndex, noteIndex);

        if (loopMode) {
            stopRepeatingNote(stringIndex, noteIndex);
        }
    };

    // Función para evaluar si puede tocar una nota con el teclado
    // Solamente devuelve false cuando el usuario hace clic en un elemento input por ejemplo
    function canPlayKeyboard() {
        const element = document.activeElement;

        return !(
            element instanceof HTMLInputElement ||
            element instanceof HTMLTextAreaElement ||
            element?.getAttribute('contenteditable') === 'true'
        );
    }

    // Función para manejar el pulso del teclado
    const handleKeyDown = (event: KeyboardEvent) => {
        // Evita que se reproduzca el sonido varias veces cuando se mantiene presionada la tecla
        if (event.repeat) return;
        if (!canPlayKeyboard()) return;

        if (event.code === keyToPress && !keyPressed && keyboardMode) {
            setKeyPressed(true);
            setIsActive(true);
            playNote(stringIndex, noteIndex);
        }
    };

    // Función para manejar el momento cuando se suelta el teclado
    const handleKeyUp = (event: KeyboardEvent) => {
        // console.log('KEYUP', event.code);

        if (event.code === keyToPress) {
            setKeyPressed(false);
            setIsActive(false);

            if (holdToPlay) {
                handleStopSound();
            }

            if (loopMode) {
                stopRepeatingNote(stringIndex, noteIndex);
            }
        }
    };

    // Función para manejar el click del mouse
    const handleMouseDown = () => {
        setIsActive(true);
        playNote(stringIndex, noteIndex);
    };

    // Función para manejar el mouse up
    const handleMouseUp = () => {
        setIsActive(false);

        if (holdToPlay) {
            handleStopSound();
        }

        if (loopMode) {
            stopRepeatingNote(stringIndex, noteIndex);
        }
    };

    const handleMouseLeave = () => {
        setIsActive(false);
    };

    // EFECTO SECUNDARIO
    //* ADVERTENCIA: NO CAMBIAR EL ACORDE INICIAL MIENTRAS SE MANTIENE PULSADA UNA TECLA
    // TODO: SOLUCIONAR EL ERRROR MENCIONADO
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };

        // holdToPlay como dependencia es necesario porque ese estado habilita si se va a silenciar el sonido al soltar la tecla
    }, [
        keyToPress,
        autoMute,
        keyboardMode,
        rootChord,
        holdToPlay,
        loopMode,
        loopIntervalMs,
    ]);

    return (
        <button
            // transition-all

            className={`
                z-20
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
            onClick={(e) => {
                // Desactiva el focus del botón cuando se pulsa la tecla espacio
                e.currentTarget.blur();
            }}
            tabIndex={-1}
        >
            {/* CASO ESPECIAL SI SE TRATA DE LA TECLA 'Dead' */}
            {showKeyboardKeys ? (keyToShow === 'Dead' ? '`' : keyToShow) : ''}
        </button>
    );
};
